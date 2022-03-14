const url = 'https://zoeken.oba.nl/api/v1/search/?q=%voetbal%22&refine=true&authorization=16c19e6083308c984c452600134989ba&sort=act_dt_asc&output=json'
fetch(url).then(response => response.json())
          .then(data => console.table(data.results))