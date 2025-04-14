$(document).ready(function() {
  const maxCharacters = 140;

  $(".new-tweet textarea").on("input", function() {
    const remainingCharacters = maxCharacters - this.value.length;
    const counter = $(this).closest("form").find(".counter");

    counter.text(remainingCharacters);

    if (remainingCharacters < 0) {
      counter.addClass('negative');
    } else {
      counter.removeClass('negative');
    }
  });
});