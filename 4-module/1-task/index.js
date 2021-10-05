function makeFriendsList (friends) {
  let friendsList = document.createElement('ul');

	for (let friend of friends) {
		friendsList.append(makeFriendItem(friend));
	}

	return friendsList;
}

function makeFriendItem (friend) {
	let friendItem = document.createElement('li');
	friendItem.textContent = `${friend.firstName} ${friend.lastName}`;
	return friendItem;
}
