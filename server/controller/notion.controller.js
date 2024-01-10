const { Client } = require("@notionhq/client");

const notion = new Client({
  auth: process.env.NOTION_SECRET,
});

module.exports = class NotionDB {
  dbProperties = ["Date", "Keywords", "Actual Link", "Description"];
  databaseId = process.env.LINKS_FOR_WEBSITE_DATABASE;
  date = "";
  keywords = "";
  link = "";
  description = "";

  async getResultsFromDB() {
    // const res = await notion.databases.query({
    //   database_id: process.env.PRS_DS_ID,
    //   sorts: [{ property: "Created time", direction: "descending" }],
    // });

    try {
      // é preciso partilhar a integração com a base de dados/database do notoion
      // Se nõa este notionhq, não tem como aceder à mesma
      const { results } = await notion.databases.query({
        database_id: this.databaseId,
      });

      const response = [];

      const tableDBLines = results;
    //   console.log(results);

      for (let tableDBLine of tableDBLines) {
        for (let prop of this.dbProperties) {
          const actualProp = tableDBLine.properties[prop];

          const _description = await this.getDescriptionFromNotion(
            prop,
            actualProp
          );
          this.description = _description ? _description : this.description;

          const _link = await this.getActualLinkFromNotion(prop, actualProp);
          this.link = _link ? _link : this.link;

          const _keywords = await this.getKeywordsFromNotion(prop, actualProp);
          this.keywords = _keywords ? _keywords : this.keywords;

          const _date = await this.getDateFromNotion(prop, actualProp);
          this.date = _date ? _date : this.date;
        }
        const dataReadyForFrontendComsumption = {
          description: this.description,
          link: this.link,
          keywords: this.keywords,
          insertedDate: this.date,
        };

        response.push(dataReadyForFrontendComsumption);
      }

      return response;
    } catch (err) {
      console.log(err, "\n", this.databaseId, "❌❌❌");
      throw err;
    }
  }

  async getDateFromNotion(prop, actualProp) {
    let actualDate;
    if (prop === "Date") {
      if (actualProp.date && actualProp.date.start) {
        actualDate = actualProp.date.start;
      }
    }
    return actualDate;
  }

  async getKeywordsFromNotion(prop, actualProp) {
    if (prop === "Keywords") {
      const keywords = actualProp.multi_select;
      if (keywords.length > 0) {
        const actualNames = [];
        keywords.forEach((el) => {
          actualNames.push(el.name);
        });

        return actualNames;
      }
    }
  }

  async getActualLinkFromNotion(prop, actualProp) {
    if (prop === "Actual Link") {
      return actualProp.url;
    }
  }

  async getDescriptionFromNotion(prop, actualProp) {
    if (prop === "Description") {
      if (actualProp.title.length > 0) {
        return actualProp.title[0].plain_text;
      }
    }
  }
};
