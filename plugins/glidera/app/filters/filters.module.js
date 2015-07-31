(function() {
  angular.module('app.filters', [])
    .filter('statusFilter', statusFilter)
    .filter('titlecase', titleCase)
    .filter('roundFiat', roundFiat)
    .filter('roundBtc', roundBtc);

  function statusFilter() {
    return function(status) {
      return (status) ? 'Verified' : 'Unverified';
    };
  }

  function personalInfoFilter() {
    return function(status) {
      if ('SUBMITTED' == status) {
        return 'Submitted'
      } else if ('PENDING' === status) {
        return 'Pending';
      } else if ('VERIFICATIONSUBMITTED' === status) {
        return 'Submitted';
      } else if ('VERIFIED' === status) {
        return 'Verified';
      } else if ('FAILED' === status) {
        return 'Failed';
      }
      return 'Unverified';
    };
  }

  function titleCase() {
    return function (input) {
      var smallWords = /^(a|an|and|as|at|but|by|en|for|if|in|nor|of|on|or|per|the|to|vs?\.?|via)$/i;

      return input.replace(/[A-Za-z0-9\u00C0-\u00FF]+[^\s-]*/g, function(match, index, title){
        if (index > 0 && index + match.length !== title.length &&
          match.search(smallWords) > -1 && title.charAt(index - 2) !== ":" &&
          (title.charAt(index + match.length) !== '-' || title.charAt(index - 1) === '-') &&
          title.charAt(index - 1).search(/[^\s-]/) < 0) {
          return match.toLowerCase();
        }

        if (match.substr(1).search(/[A-Z]|\../) > -1) {
          return match;
        }

        return match.charAt(0).toUpperCase() + match.substr(1);
      });
    }
  }

  function roundFiat(){
    return function(val,to){
        return val.toFixed(to || 2);
    }
  }

  function roundBtc(){
    return function(val,to){
        return val.toFixed(to || 5);
    }
  }

})();
