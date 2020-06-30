((exports) => {
  class AutosortableCheckboxesComponent {
    constructor(options = {}) {
      this.wrapperField = options.wrapperField;
      this._bindEvent();
      this._order();
      this._normalize();
    }

    // Order by position
    _order() {
      const max = $(this.wrapperField).find(".collection-input").length;
      $(this.wrapperField).find(".collection-input").each((idx, el) => {
        const $positionField = $(el).find("input[name$=\\[position\\]]");
        const position = $positionField.val() ? parseInt($positionField.val(), 10) : max;
        let $next = $(el).next();
        while($next.length > 0) {
          const $nextPositionField = $next.find("input[name$=\\[position\\]]");
          const nextPosition = $nextPositionField.val() ? parseInt($nextPositionField.val(), 10) : max;
          console.log("position",position,"nextPosition",nextPosition)
          if(position > nextPosition) {
            $next.insertBefore($(el));
          }
          $next = $next.next();
        }
      });
    }

    _findLastPosition() {
      let lastPosition = 0;
      $(this.wrapperField).find(".collection-input").each((idx, el) => {
        const $positionField = $(el).find("input[name$=\\[position\\]]");
        const position = parseInt($positionField.val(), 10);
        if(position > lastPosition) {
          lastPosition = position;
        }
      });
      return lastPosition;
    }

    _normalize() {
      $(this.wrapperField).find(".collection-input .position").each((idx, el) => {
        const $positionField = $(el).parent().find("input[name$=\\[position\\]]");
        if($positionField.val()) {
          $positionField.val(idx);
          $positionField.prop("disabled", false);
          $(el).html(`${idx + 1}. `);
        }
      });
    }

    _run() {
      $(this.wrapperField).find("input[type=checkbox]").each((idx, el) => {
        const $parentLabel = $(el).parents("label");

        if ($(el).is(":checked")) {
          const $lastSorted = this.wrapperField.find("label.sorted").last();

          if ($lastSorted.length > 0) {
            $lastSorted.removeClass("last-sorted");
            $parentLabel.insertAfter($lastSorted);
          } else {
            $parentLabel.insertBefore(this.wrapperField.find("label:first"));
          }

          $parentLabel.addClass("sorted");
          $parentLabel.addClass("last-sorted");
        } else {
          const $lastUnsorted = this.wrapperField.find("label:not(.sorted)").last();

          if ($lastUnsorted.length > 0) {
            $parentLabel.insertBefore($lastUnsorted);
          } else {
            $parentLabel.insertAfter(this.wrapperField.find("label:last"));
          }

          $parentLabel.removeClass("sorted");
        }
      });

      $(this.wrapperField).find("label").each((idx, el) => {
        const $positionSelector = $(el).find(".position");
        const $positionField = $(el).find("input[name$=\\[position\\]]");

        if ($(el).hasClass("sorted")) {
          $positionField.val(idx);
          $positionField.prop("disabled", false);
          $positionSelector.html(`${idx + 1}. `);
        } else {
          $positionField.val("");
          $positionField.prop("disabled", true);
          $positionSelector.html("");
        }
      });
    }

    _bindEvent() {
      $(this.wrapperField).find("input[type=checkbox]").on("change", (el) => {
        const $parentLabel = $(el.target).parents("label");
        const $positionSelector = $parentLabel.find(".position");
        const $positionField = $parentLabel.find("input[name$=\\[position\\]]");
        const lastPosition = this._findLastPosition();

        console.log(el.target.checked,$(el).is(":checked"),"lastPosition",lastPosition);

        if (el.target.checked) {
          $positionField.val(lastPosition + 1);
          $positionField.prop("disabled", false);
          $positionSelector.html(lastPosition + 1);
        } else {
          $positionField.val("");
          $positionField.prop("disabled", true);
          $positionSelector.html("");
        }
        this._order();
        this._normalize();
      });
    }
  }

  exports.Decidim = exports.Decidim || {};
  exports.Decidim.createAutosortableCheckboxes = (options) => {
    return new AutosortableCheckboxesComponent(options);
  };
})(window);
