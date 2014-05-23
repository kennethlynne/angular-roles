'use strict';

describe('Directive: ng-roles', function () {

    var ngRoles, myApp, guestProfile, managerProfile;

    beforeEach(function () {

        module('ngRoles');

        inject(function (_ngRoles_) {
            ngRoles = _ngRoles_;
        });
        // create application (module)
        myApp = ngRoles.addApplication("myapp", [ "create", "remove", "view" ]);
        // create profile
        guestProfile = ngRoles.addProfile("guest");
        // create profile
        managerProfile = ngRoles.addProfile("manager");

    });

    it('Guest has myapp.view role', function () {
        guestProfile.addRoles("myapp.view");
        expect(guestProfile.hasRoles("myapp.view")).toBeTruthy();
    });

    it('Guest doesn\'t has myapp.create role ', function () {
        guestProfile.addRoles("myapp.view");
        expect(ngRoles.getProfile("guest").hasRoles("myapp.create")).toBeFalsy();
    });

    it('Manager has myapp.view/create role', function () {
        managerProfile.addRoles("myapp.*");
        expect(ngRoles.getProfile("manager").hasRoles("myapp.view", "myapp.create")).toBeTruthy();
    });

    it('Guest has any of myapp.view/create roles', function () {
        guestProfile.addRoles("myapp.view");
        expect(ngRoles.getProfile("guest").hasAnyRoles("myapp.view", "myapp.create")).toBeTruthy();
    });

    it('Removing myapp.create role should remover myapp.create from Manager myapp.create role', function () {
        managerProfile.addRoles("myapp.*");
        myApp.removeRoles("create");
        expect(ngRoles.getProfile("manager").hasRoles("myapp.create")).toBeFalsy();
    });

    it('Admin myapp.admin role should add myapp.admin role to Manager roles', function () {
        managerProfile.addRoles("myapp.*");
        myApp.addRoles("admin");
        expect(ngRoles.getProfile("manager").hasRoles("myapp.admin")).toBeTruthy();
    });

});

