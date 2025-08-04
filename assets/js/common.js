  $(document).ready(function () {
    $('#menuToggle').click(function () {
      $(this).toggleClass('open');            // Hamburger <-> Cross
      $('#navMenu').slideToggle(300);         // Slide nav menu
    });
  });



$(document).ready(function () {
  $('.faq-head').on('click', function () {
    const $this = $(this);
    const $content = $this.next('.faq-content');

    // Close all others
    $('.faq-content').not($content).slideUp();
    $('.faq-head').not($this).removeClass('active');

    // Toggle current
    $content.slideToggle();
    $this.toggleClass('active');
  });
});


$(document).ready(function () {
    $('a[href^="#"]').on('click', function (e) {
      const target = $(this.getAttribute('href'));
      if (target.length) {
        e.preventDefault();

        // Scroll to the element with offset (e.g., 100px)
        $('html, body').animate({
          scrollTop: target.offset().top - 150
        }, 500); // 500ms = duration
      }
    });
  });


  
  let num1, num2;

  function generateCaptcha() {
    num1 = Math.floor(Math.random() * 10) + 1;
    num2 = Math.floor(Math.random() * 10) + 1;
    document.getElementById('captcha-question').innerText = `${num1} + ${num2}`;
  }

  $(document).ready(function () {
    generateCaptcha();

    $('.pure-form').on('submit', function (e) {
      e.preventDefault();

      // Clear any previous error
      $('#captcha-error').hide();

      // Validate empty fields
      let isValid = true;
      $(this).find('input[type="text"], input[type="email"], input[type="tel"], textarea, select').each(function () {
        if ($(this).val().trim() === '') {
          isValid = false;
          $(this).css('border', '1px solid red');
        } else {
          $(this).css('border', '');
        }
      });

      // Validate gender radio buttons
      if ($('input[name="gender"]:checked').length === 0) {
        isValid = false;
        alert("Please select your gender.");
      }

      // Validate CAPTCHA
      const captchaInput = parseInt($('#captcha').val(), 10);
      const captchaSum = num1 + num2;
      if (isNaN(captchaInput) || captchaInput !== captchaSum) {
        $('#captcha-error').show();
        generateCaptcha(); // regenerate if failed
        isValid = false;
      }

      if (!isValid) {
        return;
      }

      // Proceed with AJAX submission
      const formData = $(this).serialize();

      $.ajax({
        type: 'POST',
        url: 'save_contact.php',
        data: formData,
        success: function (response) {
          alert('Form submitted successfully!');
          $('.pure-form')[0].reset();
          generateCaptcha(); // regenerate for next submission
        },
        error: function () {
          alert('There was an error submitting the form.');
        }
      });
    });
  });


