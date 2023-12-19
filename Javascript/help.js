jQuery(document).ready(function ($) {
  $(".popup-trigger").on("click", function (event) {
    event.preventDefault();
    $(".popup").addClass("is-visible");
  });

  $(".popup").on("click", function (event) {
    if ($(event.target).is(".popup-close") || $(event.target).is(".popup")) {
      event.preventDefault();
      $(this).removeClass("is-visible");
    }
  });

  $(document).keyup(function (event) {
    if (event.which == "27") {
      $(".popup").removeClass("is-visible");
    }
  });
});
