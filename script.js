window.fbAsyncInit = function () {
  FB.init({
    appId: 'SEU_APP_ID_AQUI',
    autoLogAppEvents: true,
    xfbml: false,
    version: 'v24.0',
  });
};

// Load SDK
(function (d, s, id) {
  let js,
    fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s);
  js.id = id;
  js.src = 'https://connect.facebook.net/en_US/sdk.js';
  fjs.parentNode.insertBefore(js, fjs);
})(document, 'script', 'facebook-jssdk');

function startSignup() {
  FB.login(
    function (response) {
      if (response.authResponse) {
        console.log('SUCCESS', response);

        // Você NÃO precisa fazer nada aqui agora
        // A Meta já cria o vínculo e envia eventos pro webhook
      } else {
        console.log('CANCELADO');
      }
    },
    {
      scope: 'business_management,whatsapp_business_management',
    }
  );
}
