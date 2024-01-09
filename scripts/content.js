const scrapeFriends = () => {
  chrome.storage.local.get({ friendsData: [] }, function (result) {
    let existingFriendsData = result.friendsData;

    let allFriend = document.querySelectorAll('.x1i10hfl.xjbqb8w.x6umtig.x1b1mbwd.xaqea5y.xav7gou.x9f619.x1ypdohk.xt0psk2.xe8uvvx.xdj266r.x11i5rnm.xat24cr.x1mh8g0r.xexx8yu.x4uap5.x18d9i69.xkhd6sd.x16tdsg8.x1hl2dhg.xggy1nq.x1a2a7pz.x1heor9g.xt0b8zv');
    let allimgs = document.querySelectorAll('.x1i10hfl.x1qjc9v5.xjbqb8w.xjqpnuy.xa49m3k.xqeqjp1.x2hbi6w.x13fuv20.xu3j5b3.x1q0q8m5.x26u7qi.x972fbf.xcfux6l.x1qhh985.xm0m39n.x9f619.x1ypdohk.xdl72j9.x2lah0s.xe8uvvx.xdj266r.xat24cr.x1mh8g0r.x2lwn1j.xeuugli.xexx8yu.x4uap5.x18d9i69.xkhd6sd.x16tdsg8.x1hl2dhg.xggy1nq.x1ja2u2z.x1t137rt.x1o1ewxj.x3x9cwd.x1e5q0jg.x13rtm0m.x1q0g3np.x87ps6o.x1lku1pv.x1rg5ohu.x1a2a7pz.xwzfr38.xktsk01.x1n2onr6.x1dmp6jm');

    let friendsData = [];

    for (let i = 1; i < allFriend.length; i++) {
      let name = allFriend[i].querySelector('span').textContent;
      let imgSrc = allimgs[i - 1].querySelector('img').src;

      let friendObj = {
        name,
        imgSrc,
        sent: false
      };

      if (!existingFriendsData.some(existingFriend => existingFriend.name === name && existingFriend.imgSrc === imgSrc)) {
        friendsData.push(friendObj);
      }
    }

    let updatedFriendsData = existingFriendsData.concat(friendsData);

    chrome.storage.local.set({ friendsData: updatedFriendsData }, function () {
      console.log('Friends data saved to chrome.storage.local');
    });
  });
}

window.addEventListener('scroll', scrapeFriends);


//----------------------------------------------------------------------------------------------------------------------

// chrome.storage.local.get(null, function(data) {
//   console.log(data);
// });

// function clearFriendsData() {
//   chrome.storage.local.set({ friendsData: [] }, function() {
//     console.log('Friends data cleared from chrome.storage.local');
//   });
// }

// clearFriendsData();
