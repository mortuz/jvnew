(function($){

  // fetching solutions
  var solutionImages = [
    './img/solutions/marketing.svg',
    './img/solutions/geo.svg',
    './img/solutions/camp.svg',
    './img/solutions/geo.svg',
    './img/solutions/int.svg',
    './img/solutions/app.svg',
    './img/solutions/mob.svg',
    './img/solutions/money.svg',
  ];

  $.ajax({
    url: "http://jventures.pk/backend/wp-json/wp/v2/posts",
    data: { categories: 5 },
    type: 'get',
    success: function(data) {
      // console.log(data);
      data = data.reverse()
      var html = '';

      for (let i = 0; i < data.length; i++) {
        const elem = data[i];
        var title = elem.title.rendered;
        var titleArr = title.split(' ');
        var identifier = 2;

        if ( titleArr.length == 2) {
          identifier = 1
        } else if (titleArr.length == 6){
          identifier = 3;
        }

        title = '';
        for (let j = 0; j < titleArr.length; j++) {
          const titl = titleArr[j];
          if (j == identifier) {
            // add line break
            title += '<br>';
          }
          title += titl + ' ';
        }

        // console.log(title);
        if (i == 0 || i == 4) {
          html += '<div class="row">';
        }
        html += `
          <div class="column-4 text-center">
              <div class="item animate">
                  <div class="item-content item-front">
                      <img src="${solutionImages[i]}" alt="">
                      <p class="mt-3 small-text">${title}</p>
                  </div>

                  <div class="item-content item-back small-text">
                      ${$(elem.excerpt.rendered).text()}
                  </div>

              </div>
          </div>
        `;
        if (i == 3 || i == 7) {
          html += '</div>';
        }
      }

      $('.js-sol-content').html(html);
      // console.log(html);
    },
    error: function(err) {
        console.error('FETCH_SOLUTIONS_ERR:', err);
    }
  });

  //fetch blog
  $.ajax({
    url: "http://jventures.pk/backend/wp-json/wp/v2/posts?_embed",
    data: { categories: 4 },
    type: "get",
    success: function(data) {
      console.log(data);

      var html = '';

      for (let i = 0; i < data.length; i++) {
        const article = data[i];

        var title = article.title.rendered;
        var excerpt = $(article.excerpt.rendered).text().substr(0, 150);
        var image = article._embedded['wp:featuredmedia'][0].source_url;
        
        html += `
          <div class="item text-center animate">
            <!-- Featured image -->
            <div class="view overlay rounded z-depth-2 mb-4">
                <img class="img-fluid" src="${image}"
                    alt="Sample image">
                <a>
                    <div class="mask rgba-white-slight"></div>
                </a>
            </div>


            <!-- Post title -->
            <h5 class="font-weight-normal mb-3 small-text">
                ${title}
            </h5>
            <!-- Excerpt -->
            <div class="small-text">
                <p><small>${excerpt}</small></p>

            </div>
            <!-- Read more button -->
            <a class="btn-link heading-text" target="_blank" href="/blog.html?id=${article.id}"><small>Read more</small></a>
          </div>
        `;
      }

      $('.js-blog').html(html);

      $('.js-blog').owlCarousel({
        autoplay: true,
        loop: false,
        margin: 10,
        responsiveClass: true,
        responsive: {
          0: {
            items: 1,
          },
          768: {
            items: 2,
          },
          1000: {
            items: 4,
            margin: 20
          }
        }
      });
    },
    error: function(err) {
      console.error("FETCH_TEAM_ERR:", err);
    }
  });

  //fetch case studides
  var caseCarousel;
  var currentId = 2;
  var fetchCaseStudies = function(id) {
    $.ajax({
      url: "http://jventures.pk/backend/wp-json/wp/v2/posts?_embed",
      data: { categories: id },
      type: "get",
      success: function(data) {
        // console.log(data);
          var animateClass = "";

          if (id == 2) {
              if (currentId == 2)
                  animateClass = 'animate';
              else
                  animateClass = 'animated fadeInRight';
          } else {
              animateClass = 'animated fadeInRight';
          }
        
        var html = '';
        var links = [];
        for (let i = 0; i < data.length; i++) {
          const item = data[i];
          links = item.content.rendered.match(/href="([^"]*")/g);
          if (links != null) {
            // links = $(links).replace("href=", "");
            
            if (links && links.length) {
              links = links[0].replace("href=", "");
              links.split('"').join('');
              // console.log(links)
            } 
          } else {
            links = '#';
          }
          
          
          currentId = id;
          var title = item.title.rendered;
          var content = $(item.content.rendered)
            .empty("a")
            .text()
            .substr(0, 120);

            // console.log(content)
          var image = item._embedded['wp:featuredmedia'][0].source_url;
          
          console.log(links);
          html += `
            <div class="item ${animateClass}">
              <div class="card">
                  <img class="card-img-top" src="${image}" alt="Card image cap">
                  <div class="card-body">
                      <h6 class="card-title text-uppercase small-text">${title}</h6>
                      <p class="card-text small-text"><small>${content}</small></p>
                      <a href=${links} target="_blank" class="btn btn-rounded btn-outline-primary"><small>Download</small></a>
                  </div>
              </div>
            </div>
          `;
        }

        $('.js-case-studies').html(html);

        // if(id !=2) {
          $(".js-case-studies").trigger("destroy.owl.carousel");
          // return;
        // }

        caseCarousel = $(".js-case-studies");
        caseCarousel.owlCarousel({
          autoplay: true,
          loop: false,
          margin: 20,
          nav: true,
          navContainerClass: "owl-nav case-more-nav",
          responsiveClass: true,
          responsive: {
            0: {
              items: 1
            },
            768: {
              items: 2
            },
            1000: {
              items: 3
            }
          }
        });
      },
      error: function(err) {
        console.error('FETCH_CASE_STUDIES_ERR:', err);
      }
    })
  }

  fetchCaseStudies(2);

  // change case studies

  $(".js-case-studies-tab").on('click', 'a', function(e){
    e.preventDefault();
    $('.js-case-studies-tab').find('.active').removeClass('active');
    $(this).addClass('active');
    var id = $(this).attr('data-id');
    // currentId = id;
    fetchCaseStudies(id);
    // caseCarousel.destroy();
  });

})(jQuery)