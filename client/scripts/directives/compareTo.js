// Declare the angular variable
var angular = window.angular

// Directive for password confirmation validation
angular.module("eventApp").directive("compareTo", () => ({
  require: "ngModel",
  scope: {
    otherModelValue: "=compareTo",
  },
  link: (scope, element, attributes, ngModel) => {
    ngModel.$validators.compareTo = (modelValue) => modelValue === scope.otherModelValue

    scope.$watch("otherModelValue", () => {
      ngModel.$validate()
    })
  },
}))

