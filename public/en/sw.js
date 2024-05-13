  // The install button.
  document.addEventListener('DOMContentLoaded', () => {
    console.log("agdjagsdjhasgjdh")

    const installButton =  document.getElementById('myElement');
    
    // Only relevant for browsers that support installation.
    if ('BeforeInstallPromptEvent' in window) {
     
      let installEvent = null;
    
      // Function that will be run when the app is installed.
      const onInstall = () => {
        // Disable the install button.
        installButton.disabled = true;
        // No longer needed.
        installEvent = null;
      };
    
      window.addEventListener('beforeinstallprompt', (event) => {
        // Do not show the install prompt quite yet.
        event.preventDefault();
      
        installEvent = event;
        // Enable the install button.
        installButton.disabled = false;
      });
    
      installButton.addEventListener('click', async () => {
      console.log("agdjagsdjhasgjdh")
        if (!installEvent) {
          return;
        }
     
        installEvent.prompt();
        const result = await installEvent.userChoice;
     
        if (result.outcome === 'accepted') {
          onInstall();
        }
      });
    
      // The user can decide to ignore the install button
      // and just use the browser prompt directly. In this case
   
      window.addEventListener('appinstalled', () => {
        onInstall();
      });
    }
        
  });
