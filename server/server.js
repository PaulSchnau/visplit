if (Meteor.isServer) {
    Meteor.startup(function() {
        ServiceConfiguration.configurations.remove({
            service: "facebook"
        });
        ServiceConfiguration.configurations.insert({
            service: "facebook",
            clientId: secrets.facebook.clientId,
            secret: secrets.facebook.clientId
        });
        ServiceConfiguration.configurations.remove({
            service: "google"
        });
        ServiceConfiguration.configurations.insert({
            service: "google",
            clientId: secrets.google.clientId,
            secret: secrets.google.secret
        });
    });

    Accounts.onCreateUser(function(user){
        TimersCollection.insert({
            isStart: false,
            elapsed: 0,
            diff: 0,
            splits: [],
            owner: user._id
        });
        return user;
    });
}

if (Meteor.isClient) {
  Accounts.ui.config({
    passwordSignupFields: "USERNAME_ONLY"
  });
}
