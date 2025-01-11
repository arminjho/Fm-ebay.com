

// performSearch(): Glavna funkcija koja se poziva za pokretanje pretrage.
// getInput(fieldId): Pomoćna funkcija (čija implementacija nije dana) koja dohvaća vrijednost unesenog polja na temelju njegovog ID-a. Pretpostavlja se da se unosi nalaze u nekom HTML obrascu.
// executeSearch(filters): Pomoćna funkcija koja izvršava pretragu s danim filterima. Implementacija ove funkcije ovisi o načinu na koji se pretraga implementira (npr. poziv API-ja).
// displayError(message): Pomoćna funkcija koja prikazuje poruku o grešci korisniku.
// displayMessage(message): Pomoćna funkcija koja prikazuje općenitu poruku korisniku.
// if (keywords !== ""): Provjerava da li je unesena vrijednost u polje za ključne riječi. Slično se provjerava i za ostala polja.
// parseFloat(maxPrice) > parseFloat(minPrice): Konvertira minPrice i maxPrice u brojeve (parseFloat) i provjerava da li je maksimalna cijena veća od minimalne.





function performSearch() {
    let keywords = getInput("keywords");
    let category = getInput("category");
    let minPrice = getInput("minPrice");
    let maxPrice = getInput("maxPrice");
  
    if (keywords !== "") {
      if (category !== "") {
        if (minPrice !== "") {
          if (maxPrice !== "") {
            if (parseFloat(maxPrice) > parseFloat(minPrice)) {
              executeSearch({ keywords: keywords, category: category, minPrice: minPrice, maxPrice: maxPrice });
            } else {
              displayError("Max price must be greater than min price");
            }
          } else {
            executeSearch({ keywords: keywords, category: category, minPrice: minPrice });
          }
        } else {
          if (maxPrice !== "") {
            executeSearch({ keywords: keywords, category: category, maxPrice: maxPrice });
          } else {
            executeSearch({ keywords: keywords, category: category });
          }
        }
      } else {
        if (minPrice !== "") {
          if (maxPrice !== "") {
            if (parseFloat(maxPrice) > parseFloat(minPrice)) {
              executeSearch({ keywords: keywords, minPrice: minPrice, maxPrice: maxPrice });
            } else {
              displayError("Max price must be greater than min price");
            }
          } else {
            executeSearch({ keywords: keywords, minPrice: minPrice });
          }
        } else {
          if (maxPrice !== "") {
            executeSearch({ keywords: keywords, maxPrice: maxPrice });
          } else {
            executeSearch({ keywords: keywords });
          }
        }
      }
    } else {
      if (category !== "") {
        if (minPrice !== "") {
          if (maxPrice !== "") {
            if (parseFloat(maxPrice) > parseFloat(minPrice)) {
              executeSearch({ category: category, minPrice: minPrice, maxPrice: maxPrice });
            } else {
              displayError("Max price must be greater than min price");
            }
          } else {
            executeSearch({ category: category, minPrice: minPrice });
          }
        } else {
          if (maxPrice !== "") {
            executeSearch({ category: category, maxPrice: maxPrice });
          } else {
            executeSearch({ category: category });
          }
        }
      } else {
        if (minPrice !== "") {
          if (maxPrice !== "") {
            if (parseFloat(maxPrice) > parseFloat(minPrice)) {
              executeSearch({ minPrice: minPrice, maxPrice: maxPrice });
            } else {
              displayError("Max price must be greater than min price");
            }
          } else {
            executeSearch({ minPrice: minPrice });
          }
        } else {
          if (maxPrice !== "") {
            executeSearch({ maxPrice: maxPrice });
          } else {
            displayMessage("Please enter search criteria");
          }
        }
      }
    }
  }


  
 
  function getInput(fieldId) {
  
  }
  
  function executeSearch(filters) {
    
  }
  
  function displayError(message) {
    
  }
  
  function displayMessage(message) {
   
  }

