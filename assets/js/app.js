jQuery(function() {
  
  // check if websocket is supported on the browser
  if (!window.WebSocket) {
    alert("Browser does not support the WebSocket API!");
  } else {

    // https://github.com/binance-us/binance-official-api-docs/blob/master/web-socket-streams.md

    const binanceSocket = "wss://stream.binance.us:9443/ws"

    const msgSubscribe = {
      method: 'SUBSCRIBE',
      params: ['dogeusd@bookTicker'],
      id: 1337,
    };

    socket = new WebSocket(binanceSocket);

    socket.onopen = function() {
      socket.send(JSON.stringify(msgSubscribe));

      setTimeout(function(){ 
        $('.socket-status').hide()
        $('.coin-icon').show()
        $('.coin-data').show()
      }, 1500);

    };

    socket.onclose = function(event) {
      if (event.wasClean) {
        alert(`[close] Connection closed cleanly, code=${event.code} reason=${event.reason}`);
      } else {
        // server process killed or network down
        alert('[close] Connection died');
      }

      $('.socket-status').show()
      $('.coin-icon').hide()
      $('.coin-data').hide()
    };

    socket.onerror = function(error) {
      console.log(`[error] ${error.message}`);

      $('.socket-status').show()
      $('.coin-icon').hide()
      $('.coin-data').hide()
    };

    socket.onmessage = function(event) {
      const data = JSON.parse(event.data)

      if (data.b) {
        $(".price").html(`$${data.b}`)  
      }
      
    };

  } 

});