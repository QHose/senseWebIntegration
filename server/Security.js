// import qlikauth from 'qlik-auth';

// if(Meteor.users.find().count() === 0){ 
  if(1===1){
  Meteor.users.remove({});
  var users = [
  {name:"Normal User",email:"normal@example.com",roles:[]},
  {name:"View-Secrets User",email:"view@example.com",roles:['view-secrets']},
  {name:"Manage-Users User",email:"manage@example.com",roles:['manage-users']},
  {name:"bieshose Admin User",email:"bieshose@gmail.com",roles:['admin'], group: Roles.GLOBAL_GROUP},
  {name:"John from Shell",email:"john@hotmail.com",roles:['admin'],group: 'Shell'},
  {name: "Piet from Esso",email:"piet@hotmail.com",roles:['admin'],group: 'Esso'}
  ];

  console.log('de global group heeft waarde: '+Roles.GLOBAL_GROUP);

  _.each(users, function (user) {
    var id;

    id = Accounts.createUser({
      email: user.email,
      password: "bieshose",
      profile: { name: user.name }
    });

    if (user.roles.length > 0) {
    // Need _id of existing user record so this call must come 
    // after `Accounts.createUser` or `Accounts.onCreate`
    Roles.addUsersToRoles(id, user.roles, user.group);
  }

    // if(user.roles[0]==='admin'){
      // houston_admins.insert({user_id: id});
    // }

});
}

console.log('Load houston, the admin package, config');
//Houston.add_collection(Customers);
Houston.add_collection(Meteor.users );
Houston.add_collection(Houston._admins);

//sense integration, get ticket when users logs in

// Tracker.autorun(function(){
//   if(this.userId()){
    
//   }
// });

