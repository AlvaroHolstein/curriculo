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
import io from 'socket.io-client';

export default {
  data() {
    return {
      textMessage: "text",
      firstTimeChatOpen: true,
      socketClient: null,
      messages: [
        { message: "ola", date: "2020/08/31", self: false },
        {
          message:
            "asdlklaksjdoaijsldknalksndlaknlaksndlkknalsdknaoilknalksnls lkmalskdm",
          date: "2020/08/31",
          self: true,
        },
        { message: "ola", date: "2020/08/31", self: true },
        { message: "ola", date: "2020/08/31", self: true },
        { message: "ola", date: "2020/08/31", self: true },
        {
          message:
            "asdlklaksjdoaijsldknalksndlaknlaksndlkknalsdknaoilknalksnls lkmalskdm",
          date: "2020/08/31",
          self: true,
        },
        { message: "ola", date: "2020/08/31", self: true },
        {
          message:
            "asdlklaksjdoaijsldknalksndlaknlaksndlkknalsdknaoilknalksnls lkmalskdm",
          date: "2020/08/31",
          self: false,
        },
        { message: "ola", date: "2020/08/31", self: true },
      ],
      showMessages: false,
      url:
        process.env.NODE_ENV == "production"
          ? "https://alvarocurriculo.herokuapp.com/api/"
          : "http://localhost:5000/api/",
    };
  },
  async created() {
    // Vai ser aqui qu vou buscar todas as mensagens que tenahm sido trocadas entre mim e o utilizador autenticado
    // let res = fetch()

    this.socketClient = io.connect("http://127.0.0.1:5000/socket.io/", {
      withCredentials: false,
      secure: false,
      rejectUnauthorized: false
    });
    console.log(this.socketClient)

    this.socketClient.on("connect", socket => {
      console.log("connected", socket)
    })
  },
  mounted() {
    document.querySelector("#text").addEventListener("keypress", (event) => {
      if (event.keyCode == 13) {
        this.sendMessage(); 
      }
    });
  },
  computed: {
      messagesFilter() {
        return this.messages
      }
  },
  methods: {
    openMessages() {
      // let messageWrapper = document.querySelector("#messaging");
      // console.log(messageWrapper);

      this.showMessages = !this.showMessages;
      
      if(this.firstTimeChatOpen) {
        this.scrollDownMessageContainer();
        this.firstTimeChatOpen = false;
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
      if(this.textMessage) {
        let messageObj = {
        message: this.textMessage,
        date: new Date().toISOString(),
        empresa: "TBD",
        compId: -1,
        name: "TBD"
      };

      /** Enviar para o client Socket IO */

      this.messages.push(messageObj);
      //Limpar a caixa de texto
      
      this.textMessage = "";
      this.scrollDownMessageContainer();
      }
    },
    closeMessages() {
      this.showMessages = false;
    },
    scrollDownMessageContainer() {
      let messageContainer = document.querySelector("div.message-container-body");

      // Workaround para deixar as coisas assentarem  
      setTimeout(() => {
              messageContainer.scrollTop = messageContainer.scrollHeight; 
      }, 100)
    }
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
  transition: all 5s ease-in-out;
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
    right: 0px;
  }
  &.self {
    border-radius: 5px 5px 5px 0px;
    left: 0px;
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
</style>