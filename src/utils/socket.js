import * as SockJS from 'sockjs-client';
import Stomp from 'stompjs';

var stompClient = null;

export const connect = (setCurrentItemState) => {
    
    var socket = new SockJS('https://auctionappbackendmirza.herokuapp.com/stomp-endpoint');
    stompClient = Stomp.over(socket);

    stompClient.connect({}, () => {
        stompClient.subscribe('/topic/greetings', (data) => {
          setCurrentItemState(JSON.parse(data.body));
        });
       });

}

const onConnected = () => {
    console.log("onConnected");
    // Subscribe to the Public Topic
    
    stompClient.subscribe("/topic/greetings",function (greeting) {
        console.log(greeting);
        //you can execute any function here
      });

}

const onMessageReceived = (payload) => {
    console.log("onMessageReceived");
    
}

const onError = (error) => {
    this.setState({
      error:
        "Could not connect you to the Chat Room Server. Please refresh this page and try again!",
    });
  };