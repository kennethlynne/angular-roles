ng-roles
=============================

Access control library for angular applications highly inspired by [node-roles](https://github.com/dresende/node-roles).
Manage application and profile roles in a simple manner. You can define your applications/modules and set a couple of roles (permissions). Then you can define profiles and add application roles to it. 

# Installation
`bower install ng-roles --save`

# Usage
To use Roles, just include it a dependandy.
```javascript
  angular.module('appWithRoles', ['ng-roles']);
  
  angular.module('appWithRoles').controller('someCtrl', function($scope, ngRoles) {
    //Your code...
  });
```

## Use in views
You can expose the current users profile on $rootScope.
Then you are able to hide elements based on the current users permissions.

```html
<button ng-click="delete()" ng-show="userProfile.hasRoles('users.delete')">Delete user<button>
```

### Creating an application

An application can be your entire application or an application module, it's your choice to split the
roles into several applications (modules) or have all roles in one big application. To create an
application you just have to define a name.

```javascript
var myApp = ngRoles.addApplication('appWithRoles');
```

You can then add and remove roles from it.

```javascript
myApp.addRoles('create')
     .addRoles('remove')
     .addRoles('view');
     
// or add them all at once
myApp.addRoles('create', 'remove', 'view', 'list');

// you can remove the same way
myApp.removeRoles('list');
```

You could do this all in the application constructor:
```javascript
var myApp = ngRoles.addApplication('appWithRoles', [ 'create', 'remove', 'view' ]);
```
### Creating a profile

A profile is a way of defining a set of permissions that someone or something (that has that profile
associated) can use to access somewhere or something. Confused?

```javascript
var guestProfile = ngRoles.addProfile('guest'),
    managerProfile = ngRoles.addProfile('manager');

guestProfile.addRoles("myapp.view");
managerProfile.addRoles("myapp.*"); // this is auto-updated if MyApp changes roles
```

Just like in the Application constructor, this could be defined with less calls:

```javascript
var guestProfile = ngRoles.addProfile('guest', [ 'myapp.view' ]),
    managerProfile = ngRoles.addProfile('manager', 'myapp.*');
```

### Testing roles

Now that you have your applications and profiles defined, it's simple to test roles. Imagine you have
a user that you assign the profile called "guest". You can test for a specific permission like this:

```javascript
   it('Guest has myapp.view role', function () {
        guestProfile.addRoles("myapp.view");
        expect(guestProfile.hasRoles("myapp.view")).toBeTruthy();
    });
```

If you don't assign the profiles and applications to a variable, you can retrieve them using the `roles`.

```javascript
  it('Manager has myapp.view/create role', function () {
        managerProfile.addRoles("myapp.*");
        expect(ngRoles.getProfile("manager").hasRoles("myapp.view")).toBeTruthy();
    });
```

Just like adding roles, you can also test if a profile has more than one role.

```javascript
  it('Manager has myapp.view/create role', function () {
        managerProfile.addRoles("myapp.*");
        expect(ngRoles.getProfile("manager").hasRoles("myapp.view", "myapp.create")).toBeTruthy();
    });
```

If any of the roles is not assigned to a profile, it woule return `false`. If you just want to check for
at least one role, you can use the alternative .hasAnyRoles.

```javascript
 it('Guest has any of myapp.view/create roles', function () {
        guestProfile.addRoles("myapp.view");
        expect(ngRoles.getProfile("guest").hasAnyRoles("myapp.view", "myapp.create")).toBeTruthy();
    });

```

===========================

The MIT License (MIT)

Copyright (c) 2014 Kenneth Lynne, Mohamed S.Zaghloul and contributors

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
