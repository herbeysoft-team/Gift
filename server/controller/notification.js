const db = require("../config/database");
const moment = require("moment");

exports.getmynotification = async (req, res) => {
  const userId = req.user;

  try {
    const notifications = await db.getall(
      "SELECT n.*, up.fullname AS content_owner_name, user.username AS username FROM notification n LEFT JOIN userprofile up ON (n.content_owner = up.id) OR (n.content_owner = 0 AND n.content_owner_no = up.phone_no) LEFT JOIN userprofile user ON n.userId = user.id WHERE up.id = ? ORDER BY n.date DESC LIMIT 20",
      [userId?.userId]
    );
    if (notifications) {
        if (notifications) {
          const preparedNotifications = notifications.map(notification => {
            let notificationText = '';
            
            // Determine the notification text based on content_type and activity
            if (notification.content_type === 'comment') {
              notificationText = `@${notification.username} commented on your post`;
            } else if (notification.content_type === 'upvote') {
              notificationText = `@${notification.username} upvoted your post`;
            } else if (notification.content_type === 'profile'){
                    if(notification.activity === 'follow'){
                      notificationText = `@${notification.username} started following you`;
                    }else{
                      notificationText = `@${notification.username} unfollowed you`;
                    }
            } else if (notification.content_type === 'event'){
              notificationText = `you have an event`;
            } else if (notification.content_type === 'trowbox'){
                    if(notification.activity === 'trow'){
                      notificationText = `An anonymous sender has sent you a trowbox.., Please send your wishlist`;
                    }else if(notification.activity === 'wishlist'){
                      notificationText = `@${notification.username} sent you wishlist`;
                    }else if(notification.activity === 'gifting'){
                      notificationText = `@${notification.username} sent you gift(s)`;
                    } else if(notification.activity === 'retrow'){
                      notificationText = `An anonymous sender has sent you a trowbox.., Please send your wishlist`;
                    }
                    else if(notification.activity === 'redeemed'){
                      notificationText = `Hurray!!! You have redeemed a gift`;
                    }

            }  else if (notification.content_type === 'share'){
              notificationText = `@${notification.username} shared you a post`;     
            }
            return {
              ...notification,
              notificationText
            };
          });
          
          res.status(201).json(preparedNotifications);
      
    }
  }
  } catch (error) {
    res.status(500).json({ message: "something went wrong" });
    console.log(error);
  }
};

