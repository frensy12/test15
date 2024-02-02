document.addEventListener('DOMContentLoaded', function () {
    const searchBar = document.getElementById('searchBar');
    const searchButton = document.getElementById('searchButton');
  
    // List of proxy servers
    const proxies = [
      '46.4.96.137:1080',
      '45.77.56.114:30205',
      '82.196.11.105:1080',
      '51.254.69.243:3128',
      '185.153.198.226:32498'
    ];
  
    searchButton.addEventListener('click', function () {
      const searchQuery = searchBar.value.trim();
  
      if (searchQuery !== '') {
        attemptRequest(searchQuery, proxies);
      }
    });
  
    function attemptRequest(searchQuery, proxies) {
      const proxyUrl = proxies[Math.floor(Math.random() * proxies.length)];
      const url = `https://www.google.com/search?q=${encodeURIComponent(searchQuery)}`;
  
      // Use the selected proxy for the request
      fetch(proxyUrl + '?' + url)
        .then(response => response.text())
        .then(html => {
          // Handle the HTML response (e.g., parse it, extract information)
          console.log(html);
        })
        .catch(error => {
          console.error('Error fetching search results:', error);
  
          // Retry with a different proxy
          const remainingProxies = proxies.filter(p => p !== proxyUrl);
          if (remainingProxies.length > 0) {
            attemptRequest(searchQuery, remainingProxies);
          } else {
            console.error('All proxies failed. Unable to fetch search results.');
          }
        });
    }
  });
  