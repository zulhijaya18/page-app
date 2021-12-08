class pageApp {
  constructor(mainElement) {
    this.mainElement = mainElement;
    this.dataStorage;
    this.pageRoute = {}
    // this.url = document.location;
    let self = this;
    window.onpopstate = async function(e) {
        self.onLoading();
        e.state == null ? '' :
        await self.pageRoute[e.state.to](e.state.params);
    };
  }

  addRoute(routeName, url) {
      this.pageRoute[routeName] = async (params) => await this.fetchPage(url, params).then(() => {
          return 'success';
      });
  }
  
  async goTo(to, params = {}) {
    this.onLoading();
    window.history.pushState({to: to, params: params} , 'title');
    // window.history.pushState({to: to, params: params} , 'title', `${url}${to}`);
    await this.pageRoute[to](params);
  }

  async back() {
      window.history.back();
  }

  async simpleFetch(url, params) {
      let outp = '';
      await $.ajax({
          url: url,
          json: true,
          data: params,
          type: 'GET',
          success: (res) => {
              outp = res;
          }
      });
      return outp;
  }

  async simplePostFetch(url, params) {
      let outp = '';
      await $.ajax({
          url: url,
          type: 'POST',
          json: true,
          data: params,
          success: (res) => {
              outp = res;
          }
      });
      return outp;
  }

  loading() {
      return `<div style="display: flex; justify-content: center; align-items: center; height: 75vh;">Loading...</div>`;
  }

  onLoading() {
      $(this.mainElement).html(this.loading);
  }

  async fetchPage(url, params) {
      await this.simpleFetch(url, params).then(res => {
          $(this.mainElement).html(res);
          return 'success';
      });
  }
}

// Yang pakai :
// - Honda_adm_sp_stok_opname/main

