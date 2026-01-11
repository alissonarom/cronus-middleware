let fbReady = false;

// Inicialização do SDK
window.fbAsyncInit = function () {
  FB.init({
    appId: '1538972593992304',
    autoLogAppEvents: true,
    xfbml: false,
    version: 'v24.0',
  });

  fbReady = true;
  console.log('FB SDK pronto');
};

// Carregamento assíncrono do SDK
(function (d, s, id) {
  let js,
    fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s);
  js.id = id;
  js.src = 'https://connect.facebook.net/en_US/sdk.js';
  fjs.parentNode.insertBefore(js, fjs);
})(document, 'script', 'facebook-jssdk');

// Listener para eventos do Embedded Signup
window.addEventListener('message', (event) => {
  if (
    event.origin !== 'https://www.facebook.com' &&
    event.origin !== 'https://web.facebook.com'
  ) {
    return;
  }

  let data;
  try {
    data = JSON.parse(event.data);
  } catch {
    return;
  }

  if (data.type === 'WA_EMBEDDED_SIGNUP') {
    if (data.event === 'FINISH') {
      const { waba_id, phone_number_id } = data.data;

      localStorage.setItem('waba_id', waba_id);
      localStorage.setItem('phone_number_id', phone_number_id);

      console.log('Signup concluído:', waba_id, phone_number_id);
    }

    if (data.event === 'ERROR') {
      console.error('Erro no Embedded Signup:', data.data);
    }

    if (data.event === 'CANCEL') {
      console.warn('Signup cancelado:', data.data);
    }
  }
});

// Disparo do flow de Cadastro incorporado
function startSignup() {
  if (!fbReady) {
    alert('Facebook SDK ainda não carregou. Aguarde alguns segundos.');
    return;
  }

  FB.login(
    function (response) {
      if (!response.authResponse) {
        console.warn('Login cancelado');
        return;
      }

      const code = response.authResponse.code;

      fetch(
        'https://alissoncronusiacom.app.n8n.cloud/webhook-test/5e1b76ba-3c7a-4b07-9814-5a7180efb98d',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            code,
            waba_id: localStorage.getItem('waba_id'),
            phone_number_id: localStorage.getItem('phone_number_id'),
          }),
        }
      )
        .then(() => {
          console.log('Dados enviados ao n8n com sucesso');
        })
        .catch((err) => {
          console.error('Erro ao enviar para n8n', err);
        });
    },
    {
      config_id: '2077835706370255',
      response_type: 'code',
      override_default_response_type: true,
      extras: { version: 'v3', setup: {} },
    }
  );
}
