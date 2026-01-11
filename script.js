window.fbAsyncInit = function () {
  FB.init({
    appId: '1538972593992304',
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

window.addEventListener('message', (event) => {
  if (event.origin !== 'https://www.facebook.com' && event.origin !== 'https://web.facebook.com') return;

  const data = JSON.parse(event.data);

  if (data.type === 'WA_EMBEDDED_SIGNUP' && data.event === 'FINISH') {
   const { waba_id, phone_number_id } = data.data;

    localStorage.setItem('waba_id', waba_id);
    localStorage.setItem('phone_number_id', phone_number_id);
  }
});


function startSignup() {
  FB.login(
    function (response) {
      if (response.authResponse) {
        const code = response.authResponse.code;
        fetch('https://SEU_N8N_WEBHOOK_URL', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            code,
            waba_id: localStorage.getItem('waba_id'),
            phone_number_id: localStorage.getItem('phone_number_id'),
        }),
        });
      }
    },
    {
      config_id: '2077835706370255',
      response_type: 'code',
      override_default_response_type: true,
      extras: { version: 'v3', setup: {} },
    }
  );
}

