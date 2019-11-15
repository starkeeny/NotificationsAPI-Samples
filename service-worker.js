function sendToWindow(data, event) {
    clients.matchAll({
      type: 'window',
      includeUncontrolled: true
    })
    .then((windowClients) => {
      let clientIsFocused = false;
  
      for (let i = 0; i < windowClients.length; i++) {
        const windowClient = windowClients[i];
        if (windowClient.focused) {
          clientIsFocused = true;
          break;
        }

        windowClient.postMessage({
            message: 'Received a notification message.',
            time: new Date().toString(),
            data: data
          });
      }
  
      return clientIsFocused;
    });
  }
  
self.addEventListener('notificationclick', function (event) {
    console.log("service-worker:notificationClick", event, event.action, event.notification, event.notification.tag);
    sendToWindow({tag:event.notification.tag, action: event.action}, event); // click if both empty
    event.notification.close();
});

self.addEventListener('notificationclose', function (event) {
    console.log("service-worker:notificationClose", event, event.notification);
    sendToWindow("notificationclose", event);
});
