App = {
  web3Provider: null,
  contracts: {},
  account: 0x0,

  init: function () {
    return App.initWeb3();
  },
  // Connects our client side app to our local blockchain
  initWeb3: function () {
    // TODO: refactor conditional
    if (typeof web3 !== 'undefined') {
      // If a web3 instance is already provided by Meta Mask.
      App.web3Provider = web3.currentProvider;
      web3 = new Web3(web3.currentProvider);
    } else {
      // Specify default instance if no web3 instance provided
      App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
      web3 = new Web3(App.web3Provider);
    }
    return App.initContract();
  },
  // Loads up our contract into our loads up our contract into our front-end app to interact with it
  initContract: function () {
    $.getJSON("Reports.json", function (Reports) {
      // Instantiate a new truffle contract from the artifact
      App.contracts.Reports = TruffleContract(Reports);
      // Connect provider to interact with contract
      App.contracts.Reports.setProvider(App.web3Provider);

      return App.render();
    });
  },
  // 1. Display the account that we are connected to the blockchain with 2. List all of the candidates in our election
  render: function () {
    var reportsInstance;
    var loader = $("#loader");
    var content = $("#content");

    loader.show();
    content.hide();

    // Load account data
    web3.eth.getCoinbase(function (err, account) {
      console.log("getCoinbase() account:", account);
      if (err === null) {
        App.account = account.toString();
        console.log("App.account:", App.account);
        document.getElementById("accountAddress").innerHTML = "Your ethereum wallet address: " + account;
        //$("accountAddress").html("Your Account: " + account);
      }
    });

    // Load contract data 
    App.contracts.Reports.deployed().then(function (instance) {
      reportsInstance = instance;
      return reportsInstance.reportsCount();
    }).then(function (reportsCount) {
      var reportsResults = $("#reportsResults");
      reportsResults.empty();

      for (var i = 1; i <= reportsCount; i++) {
        reportsInstance.reports(i).then(function (report) {
          
          var id = report[0];
          var name = report[1];
          var voteCount = report[2];
          var fecha = report[3];
          var enfermedad = report[4];
          var tratamiento = report[5];
          var resultados = report[6];
          var verified = report[7];

          // Render report Result
          var reportTemplate =
            "<tr><th>" + id +
            "</th><td>" + name +
            "</td><td>" + voteCount +
            "</th><td>" + fecha +
            "</td><td>" + enfermedad +
            "</th><td>" + tratamiento +
            "</td><td>" + resultados +
            "</td><td>" + verified +
            // "</td><td><button type='button' onclick= 'App.castVerification(" + App.account.toString() + ", " + id +")'>Verificar</button>" +
            "</td><td><button type='button' onclick= 'App.castVerification(" + id + ")'>Verificar</button>" +

            "</td></tr>"
          reportsResults.append(reportTemplate);
        });
      }

      return reportsInstance.indexesCount();

    }).then(function (indexesCount) {
      var indexesResults = $("#indexesResults");
      indexesResults.empty();
      var differentIndexes = [];

      if (indexesCount != 0) {
        
        for (var i = 1; i <= indexesCount; i++) {

          reportsInstance.indexes(i).then(function (index) {

            console.log("index:", index);
            var id = index[0];
            var stakeholderAddress = index[1];
            var label = index[2];
            var reportId = index[3];

            console.log("Current index:", label);
            if (!(differentIndexes.includes(label))){
              var indexTemplate =
              " <a class='list-group-item clearfix'>" + label +
              " <span class='pull-right'> " +
              "   <span class='btn btn-xs btn-default' onclick=''> " +
              "     <span aria-hidden='true'>Ver Reportes</span> " +
              "   </span> " +
              " </span> " + 
              " </a> "
   
               indexesResults.append(indexTemplate);
               differentIndexes = differentIndexes.concat(label);
               console.log("differentIndexes:", differentIndexes);
            }

          });
        }
      }

      loader.hide();
      content.show();
    }).catch(function (error) {
      console.warn(error);
    });
  },

  castVerification: function (reportId) {
    let reportsInstance;
    console.log("castVerification() con", App.account.toString(), "y", reportId);
    App.contracts.Reports.deployed().then(function (instance) {
      reportsInstance = instance;

      /*  return reportsInstance.addStakeholder(App.account, reportId);
     }).then(function(result) {
       console.log("User wallet was correctly.");
       return reportsInstance.verifyReport(reportId); */

      return reportsInstance.verifyReportFinal(App.account, reportId);

    }).then(function (verificationResult) {
      console.log("Verification was cast correctly.");
      location.reload();
    }).catch(function (err) {
      console.error(err);
    });

  }


};

$(function () {
  $(window).load(function () {
    App.init();
  });
});