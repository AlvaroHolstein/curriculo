<template>
  <div class="message-wrapper">
    <div class="fab message-icon" v-on:click="openMessages()">
      <i class="fa fa-comments-o" aria-hidden="true"></i>
    </div>
    <div id="messaging" class="message-container" v-show="showMessages">
      <div class="message-container-header">
        <div class="fab close-messaging" v-on:click="closeMessages()">
          <i class="fas fa-times"></i>
        </div>
      </div>
      <div class="message-container-body">
        <!-- Deve ser preciso que estas div's tenham um id associado, para melhor serem separadas 
          pode ser o _id do Mongo -->
        <div
          class="message-text-container"
          v-for="(message, index) in messagesFilter"
          v-bind:key="index"
          v-bind:class="{ self: message.self, theirs: !message.self }"
        >
          <div
            class="message-text"
            v-bind:class="{ self: message.self, theirs: !message.self }"
          >
            {{ message.message }}
          </div>
        </div>
      </div>
      <div class="write-message-container row">
        <div class="col-11 write-message">
          <input
            type="text"
            class="text-message"
            id="text"
            v-model="textMessage"
          />
        </div>
        <div class="col-1 send-container" v-on:click="sendMessage()">
          <i class="far fa-paper-plane"></i>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import io from "socket.io-client";
import { AuthClass } from "../classes/auth.class";
import Swal from "sweetalert2";
export default {
  data() {
    return {
      textMessage: "",
      firstTimeChatOpen: true,
      socketClient: null,
      messages: [],
      showMessages: false,
    };
  },
  async created() {
    // Vai ser aqui qu vou buscar todas as mensagens que tenahm sido trocadas entre mim e o utilizador autenticado
    // let res = fetch()

    /**
     * IMPORTANTE:
     * Debugging SocketIO
     * localStorage.debug = "socket.io-client:socket"
     * https://socket.io/docs/logging-and-debugging/
     */

    this.socketClient = await io.connect(
      this.$store.getters.url.split("/api")[0],
      {
        // withCredentials: false,
        // secure: false,
        // rejectUnauthorized: false,
        query: `roomName=${this.$store.getters.discChannel}_:${Math.random()}`,
      }
    );
    // console.log(this.$store.getters.discChannel);
    this.socketClient.on("connection", (/*socket*/) => {
      // console.log("connected", socket);
    });

    // Fazer um evento para as reconexões
    // this.socketClient.emit("yo", {
    //   yo:
    //     "yo from created " +
    //     "     " +
    //     this.$store.getters.discChannel,
    //   roomName: this.$store.getters.discChannel,
    // });
    // this.socketClient.on("user left", (socket) =>
    //   // console.log("Alguem saiu", socket)
    // );

    /** Receive message from discord */
    // let uniqueChannel = `messageDisc_${this.$store.getters.discChannel}`
    this.socketClient.on("messageDisc", (data) => {
      // console.log("data", data);

      /** Inserir esta mensagem no  */
      // console.log("Message", data);
      if(data.scId != null) {
        if(data.scId == this.socketClient.id) {
          this.receiveMessages(data.msg)
        }
      } 
      else {
      this.receiveMessages(data.msg);
      }
    });

    this.socketClient.on("ownMessage", data => {
      // console.log("data", data, this.socketClient.id)
      if(data.scIds.includes(this.socketClient.id)) {
        if(data.roomName == this.socketClient.id) {
          // console.log("Chegou como deve ser")
          this.receiveMessages(data.msg, data.self)
        }
      } 
      else {
        // console.log("NADAAAAAAAAAAAA")
      // this.receiveMessages(data.msg, data.self);
      }
    })
  },
  mounted() {
    document.querySelector("#text").addEventListener("keypress", (event) => {
      if (event.keyCode == 13) {
        this.sendMessage();
      }
    });
  },
  updated() {
    // console.log("UPDATED !!!!")
    // this.socketClient.emit("yo", {
    //       yo:
    //         "yo from UPDATED!!!" + "     " + this.$store.getters.discChannel,
    //       roomName: this.$store.getters.discChannel,
    //     });
  },
  destroyed() {
    // console.log("Destruido")
  },
  computed: {
    messagesFilter() {
      return this.messages;
    },
  },
  methods: {
    async openMessages() {
      try {
        this.showMessages = !this.showMessages;

        

        if (this.firstTimeChatOpen) {
          this.scrollDownMessageContainer();
          this.firstTimeChat= false;

          /** Primeira vez que se abre as mensagens por isso carregar agora as mensagens
           */
          let { a, b } = await AuthClass.verifyToken(this.$store.getters.token);
          let res = await this.http.post(
            `${this.$store.getters.url}msg/getmessages${this.$store.getters.contaValueParams}`,
            { token: this.$store.getters.token, c: a * b, prod: process.env.NODE_ENV == 'production' ? true : false}
          );

          if (res.data.success) {
            this.messages = res.data.data;
          } else {
            // console.log(res.data)
            Swal.fire({
              position: "top-end",
              icon: "error",
              title: "Couldn't fetch Last Messages, sory!",
              showConfirmButton: false,
              timer: 1500,
            });
          }
        }
      } catch (error) {
        console.error("ERROU", error);
      }
      /** Importante
       *  Vou ter que criar sessões */
    },
    sendMessage() {
      /** Inserir mensagens no frontend
       * mas se as coisas correrm mal tem que aparecer uma mensagem
       * a avisar que é preciso tentar enviar outra vez
       * e dizer se a mensagem foi lida ou não
       */
      if (this.textMessage) {
        let messageObj = {
          message: this.textMessage,
          date: new Date().toISOString(),
          empresa: "TBD",
          compId: -1,
          name: "TBD",
          self: false,
        };

        /** Enviar para o client Socket IO */

        this.messages.push(messageObj);

        /** Acho que vai haver um stress aqui que vai ser a mensagem vai acabar a ir para todos os utilizadores
         * Update:
         * Não porque só no server side é que estou à espera deste evento
         */
        this.socketClient.emit("mess", {
          text: this.textMessage,
          token: this.$store.getters.token,
          env: process.env.NODE_ENV
        });
        //Limpar a caixa de texto

        this.textMessage = "";
        this.scrollDownMessageContainer();
      }
    },
    receiveMessages(text, self = null) {
      let messageObj = {
        message: text,
        date: new Date().toISOString(),
        empresa: "TBD",
        compId: -1,
        name: "TBD",
        self: self == null ? true : false,
      };

      this.messages.push(messageObj);
      this.scrollDownMessageContainer();
    },
    closeMessages() {
      this.showMessages = false;
    },
    scrollDownMessageContainer() {
      let messageContainer = document.querySelector(
        "div.message-container-body"
      );

      // Workaround para deixar as coisas assentarem
      setTimeout(() => {
        messageContainer.scrollTop = messageContainer.scrollHeight;
      }, 100);
    },
  },
};
</script>

<style lang="scss">
div.message-container {
  border: 0.5px solid black;

  position: fixed;

  width: 300px;
  height: 400px;

  right: 110px;
  bottom: 50px;

  border-radius: 10px 10px 0px 10px;

  box-shadow: 0 6px 10px 0 #666;

  background-color: white;

  /** Só para não ser demasiado seco
  Mas não está a funcionar */
  transition: all 0.5s ease-in-out;
}
div.message-container-header {
  width: 299px;
  height: 40px;
  /* position: relative; */

  border-radius: 9px 9px 0px 0px;
  border-bottom: 1px solid green;

  background-color: rgba(37, 186, 37, 0.9);
}

div.message-container-body {
  margin: 5px;
  padding-bottom: 5px;
  overflow-y: scroll;
  height: 320px;
}
div.fab.close-messaging {
  position: absolute;
  right: 5px;
  top: 7px;
  font-size: 30px;
}

div.message-text-container {
  &.theirs {
    text-align: right;
  }
  &.self {
    text-align: left;
  }
}
div.message-text {
  border: 0.2px solid black;
  max-width: 65%;
  width: fit-content;
  display: inline-block;
  // overflow: auto;
  word-wrap: break-word;

  &.theirs {
    border-radius: 5px 5px 0px 5px;
    left: 0px;
  }
  &.self {
    border-radius: 5px 5px 5px 0px;
    right: 0px;
  }
}

div.write-message-container {
  height: 30px; // Por agora este valor para a altura está fixi
  width: 299px;
  margin: 0px;

  border-top: 0.2px solid black;

  > div {
    padding: 0px;
  }
  > div.write-message {
    border-right: 0.2px solid black;

    // Depois tenho que melhorar a interação com a caixa de texto para quando à um texto maior.
    > input.text-message {
      width: 100%;
    }
  }
  > div.send-container:hover {
    background-color: rgba(128, 128, 128, 0.168);
  }
}

div.fab.message-icon {
  width: 60px;
  height: 60px;
  background-color: red;
  border-radius: 50%;
  box-shadow: 0 6px 10px 0 #666;
  transition: all 0.1s ease-in-out;

  font-size: 40px;
  color: white;
  text-align: center;
  line-height: 70px;

  position: fixed;
  right: 50px;
  bottom: 50px;
}
div.fab.message-icon > i {
  right: 60px;
  bottom: 60px;
  position: fixed;
  z-index: 999;
}
div.fab.message-icon:hover /*, div.fab > i:hover*/ {
  box-shadow: 0 6px 14px 0 #666;
  /* transform: scale(1.05); */
}

/** OHHHHH the media */
@media only screen and (max-width: 530px) {
  div.message-container {
    width: 300px;
    height: 400px;

    right: 80px;
    bottom: 20px;
  }

  div.fab.message-icon {
    right: 20px;
    bottom: 20px;

    > i {
      right: 30px;
      bottom: 30px;
    }
  }
}
@media only screen and (max-width: 415px) {
  div.message-container {
    width: 250px;
    height: 350px;

    right: 63px;
    bottom: 20px;
  }

  div.message-container-header {
    width: 249px;
    height: 40px;
    /* position: relative; */
  }

  div.message-container-body {
    height: 270px;
  }

  div.write-message-container {
    height: 30px; // Por agora este valor para a altura está fixi
    width: 249px;
    // margin: 0px;

    // Depois tenho que melhorar a interação com a caixa de texto para quando à um texto maior.
    > input.text-message {
      width: 100%;
    }
  }

  div.fab.message-icon {
    //Size
    width: 40px;
    height: 40px;

    font-size: 25px;

    // Position
    right: 20px;
    bottom: 20px;

    // Message Icon position
    > i {
      right: 27px;
      bottom: 27px;
    }
  }
}
</style>