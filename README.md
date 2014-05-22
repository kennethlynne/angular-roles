ng-roles
=============================

Access control library for angular applications highly inspired by [node-roles](https://github.com/dresende/node-roles).
Manage application and profile roles in a simple manner. You can define your applications/modules and set a couple of roles (permissions). Then you can define profiles and add application roles to it. 

# Installation
`bower install ng-roles --save`

# Usage
To use Roles, just include it a dependandy.
```javascript
  angular.module('myApp', ['ng-roles']);
  
  angular.module('myApp').controller('someCtrl', function($scope, ngRoles) {
    //Your code...
  });
```
### Creating an application

An application can be your entire application or an application module, it's your choice to split the
roles into several applications (modules) or have all roles in one big application. To create an
application you just have to define a name.

    var myApp = ngRoles.addApplication("myapp");

You can then add and remove roles from it.

    myApp.addRoles("create")
         .addRoles("remove")
         .addRoles("view");
    // or add them all at once
    myApp.addRoles("create", "remove", "view", "list");
    // you can remove the same way
    myApp.removeRoles("list");

You could do this all in the application constructor:

    var myApp = ngRoles.addApplication("myapp", [ "create", "remove", "view" ]);

### Creating a profile

A profile is a way of defining a set of permissions that someone or something (that has that profile
associated) can use to access somewhere or something. Confused?

    var guestProfile = ngRoles.addProfile("guest"),
        managerProfile = ngRoles.addProfile("manager");

    guestProfile.addRoles("myapp.view");
    managerProfile.addRoles("myapp.*"); // this is auto-updated if MyApp changes roles

Just like in the Application constructor, this could be defined with less calls:

    var guestProfile = ngRoles.addProfile("guest", [ "myapp.view" ]),
        managerProfile = ngRoles.addProfile("manager", "myapp.*");

### Testing roles

Now that you have your applications and profiles defined, it's simple to test roles. Imagine you have
a user that you assign the profile called "guest". You can test for a specific permission like this:

    // return true
    console.log("Guest has myapp.view role?", guestProfile.hasRoles("myapp.view"));

If you don't assign the profiles and applications to a variable, you can retrieve them using the `roles`.

    // return true
    console.log("Guest has myapp.view role?", roles.getProfile("guest").hasRoles("myapp.view"));

Just like adding roles, you can also test if a profile has more than one role.

    // return true
    console.log("Manager has myapp.view/create role?", managerProfile.hasRoles("myapp.view", "myapp.create"));

If any of the roles is not assigned to a profile, it woule return `false`. If you just want to check for
at least one role, you can use the alternative .hasAnyRoles.

    // return true
    console.log("Guest has myapp.view/create role?", guestProfile.hasAnyRoles("myapp.view", "myapp.create"));

# Use in views
You can expose the current users profile on $rootScope.
Then you are able to hide elements based on the current users permissions.

```html
<button ng-click="delete()" ng-show="userProfile.hasRoles('users.delete')">Delete something<button>
```
