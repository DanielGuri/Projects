$(document).ready(function() {
    $('#all').on('click', () => {
      $('#countery').children().remove()
      $('#region').children().remove()
      $('#currencies').children().remove()
      contry('all', '')
    })
    $('#send').on('click', () => {
      $('#countery').children().remove()
      $('#region').children().remove()
      $('#currencies').children().remove()
      var namecon = $('#namecon').val()
      contry('name', namecon)
    })

    function contry(name, con) {
      $.ajax({
        url: 'https://restcountries.com/v3.1/' + name + '/' + con,
        success: function(res) {
          console.log(res)
          var myRegion = {}
          var allPepole = 0;
          var arryRegion = [];
          var arryCurrencies = [];
          var totalCountries = res.length
          console.log('מספר התוצאות: ' + totalCountries)
          res.forEach(element => {
            if (element.currencies) {
              var keyCurrencies = Object.keys(element.currencies)
              arryCurrencies.push(keyCurrencies[0])
            }
            console.log('שם המדינה: ' + element.name.common)
            console.log('מספר האנשים במידנה: ' + element.population)
            arryRegion.push(element.region)
            allPepole += element.population
            $('#totalcon').html('Total countries result:' + `
									<p>${totalCountries}</p>`)
            $('#allpepole').html('Total Countries Population:' + `
									<p>${allPepole}</p>`)
            $('#averagepop').html('Average Population: ' + `
									<p>${(allPepole/totalCountries).toFixed()}</p>`)
            new_row = `
									<tr>
										<td class="first">${element.name.common}</td>
										<td>${element.population}</td>
										<td>${keyCurrencies}</td>
									</tr>`;
            $('#countery').append(new_row)
          });
          const region = {};
          arryRegion.forEach(function(x) {
            region[x] = (region[x] || 0) + 1;
          });
          console.log(region)
          myRegion = region
          const currencies = {};
          arryCurrencies.forEach(function(x) {
            currencies[x] = (currencies[x] || 0) + 1;
          });
          console.log(currencies)
          myCurrencies = currencies
          $.each(myRegion, function(key, value) {
            new_row = `
									<tr>
										<td>${key}</td>
										<td class="center">${value}</td>
									</tr>`;
            $('#region').append(new_row)
          })
          if ($('.front').hasClass('hide')) {
            $('.front').toggleClass('hide')
          }
          $.each(myCurrencies, function(key, value) {
            new_row = `
									<tr>
										<td>${key}</td>
										<td class="center">${value}</td>
									</tr>`;
            $('#currencies').append(new_row)
          })
        },
        error: function(abc) {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Sorry there is no such country in the database.',
            background: 'rgba(229, 229, 229, 0.867)',
            confirmButtonColor: ' #4f175fb4',
          })
        },
      })
    }
  })