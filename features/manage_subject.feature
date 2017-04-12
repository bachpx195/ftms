Feature: subjects
  In order to manage subjects.
  As an admintrator.
  I want to manage subjects in the system.

  Background:
    Given system has a user with email is "admin@tms.com", password is "12345678"
      And user has permission manage subjects include show all subjects, create, edit, delete
      And system existed subjects with name is "Ruby on Rails Tutorial Book, project 1, project 2" and corresponding with during_time is "1,2,3"

    When user logged in successfully

    Then user redirect to home screen

  Scenario: Create subject when image empty
    Given user has a permission to create subject
      And Input image is "" and other items valid

    When user click button Save in the new subject screen

    Then User should redirect to list subjects screen and subject with image is "" in show subjects screen

  Scenario: Create subject when image have extension PNG
    Given user has a permission to create subject
      And Input image is "anh.png" and other items valid

    When user click button Save in the new subject screen

    Then User should redirect to list subjects screen and subject with image is "anh.png" in show subjects screen

  Scenario: Create subject when image have extension JPG
    Given user has a permission to create subject
      And Input image is "anh.jpg" and other items valid

    When user click button Save in the new subject screen

    Then User should redirect to list subjects screen and subject with image is "anh.jpg" in show subjects screen

  Scenario: Create subject when image have extension JPEG
    Given user has a permission to create subject
      And Input image is "anh.jpeg" and other items valid

    When user click button Save in the new subject screen

    Then User should redirect to list subjects screen and subject with image is "anh.jpeg" in show subjects screen

  Scenario: Create subject when image have extension GIF
    Given user has a permission to create subject
      And Input image is "anh.gif" and other items valid

    When user click button Save in the new subject screen

    Then User should redirect to list subjects screen and subject with image is "anh.gif" in show subjects screen

  Scenario: Create subject when image have extension TIF
    Given user has a permission to create subject
      And Input image is "anh.tif" and other items valid

    When user click button Save in the new subject screen

    Then User should redirect to list subjects screen and subject with image is "anh.tif" in show subjects screen

  Scenario: Create subject when image name is blank
    Given user has a permission to create subject
      And Input image is ".png" and other items valid

    When user click button Save in the new subject screen

    Then User should redirect to list subjects screen and subject with image is ".png" in show subjects screen

  Scenario: Create subject when image name contain special charracters
    Given user has a permission to create subject
      And Input image is " anh@cat.png " and other items valid

    When user click button Save in the new subject screen

    Then User should redirect to list subjects screen and subject with image is "anh@cat.png" in show subjects screen

  Scenario: Create subject when image name the same old image name
    Given user has a permission to create subject
      And Input image is "anh.png" and other items valid

    When user click button Save in the new subject screen

    Then User should redirect to list subjects screen and subject with image is "anh.png" in show subjects screen

  Scenario: Create subject when image more than 0M and less than 5M
    Given user has a permission to create subject
      And Input image is "anh.png" have size is 3M and other items valid

    When user click button Save in the new subject screen

    Then User should redirect to list subjects screen and subject with image is "anh.png" in show subjects screen

  Scenario: Create subject when imgage more than 5M
    Given user has a permission to create subject
      And Input image is "anh.png" have size is 6M and other items valid

    When user click button Save in the new subject screen

    Then Display message "Size image more than 5M"

  Scenario: Create subject when image have extension doc
    Given user has a permission to create subject
      And Input image is "anh.doc" and other items valid

    When Input image

    Then Can not upload with image is "anh.docx"

  Scenario: Create subject when image have extension docx
    Given user has a permission to create subject
      And Input image is "anh.docx" and other items valid

    When Input image

    Then Can not upload with image is "anh.docx"

  Scenario: Create subject when image have extension xlsx
    Given user has a permission to create subject
      And Input image is "anh.xlsx" and other items valid

    When user click button Save in the new subject screen

    Then Can not upload with image is "anh.xlsx"

  Scenario: Create subject when image have extension xls
    Given user has a permission to create subject
      And Input image is"anh.xls" and other items valid

    When Input image

    Then Can not upload with image is "anh.xls"

  Scenario: Create subject when image have extension csv
    Given user has a permission to create subject
      And Input image is "anh.csv" and other items valid

    When Input image

    Then Can not upload with image is "anh.csv"

  Scenario: Create new subject with name is blank
    Given user has a permission to create subject
      And input name is ""

    When user click button Save in the new subject screen

    Then state of button save is disable and can not click

  Scenario: Create new subject with name is valid and include 1 character
    Given user has a permission to create subject
      And input name is "A"

    When user click button Save in the new subject screen

    Then User should redirect to list subjects screen and name is "A" in show subjects screen

  Scenario: Create new subject with name is valid and include 255 character
    Given user has a permission to create subject
      And input name is "Ruby on Rails Tutorial BookRuby on Rails Tutorial BookRuby on Rails Tutorial BookRuby on Rails Tutorial BookRuby on Rails Tutorial BookRuby on Rails Tutorial BookRuby on Rails Tutorial BookRuby on Rails Tutorial BookRuby on Rails Tutorial BookRuby on Rail"

    When user click button Save in the new subject screen

    Then User should redirect to list subjects screen and name is "Ruby on Rails Tutorial BookRuby on Rails Tutorial BookRuby on Rails Tutorial BookRuby on Rails Tutorial BookRuby on Rails Tutorial BookRuby on Rails Tutorial BookRuby on Rails Tutorial BookRuby on Rails Tutorial BookRuby on Rails Tutorial BookRuby on Rail" in show subjects screen

  Scenario: Create new subject with name is valid and contain special characters
    Given user has a permission to create subject
      And input name is "@Ruby#"

    When user click button Save in the new subject screen

    Then User should redirect to list subjects screen and name is "@Ruby#" in show subjects screen

  Scenario: Create new subject with name is valid and contain html, javscript tags
    Given user has a permission to create subject
      And input name is "<script>alert('abc')</script>"

    When user click button Save in the new subject screen

    Then User should redirect to list subjects screen and name is "<script>alert('abc')</script>" in show subjects screen

  Scenario: Create new subject with name is valid and include 1-255 character
    Given user has a permission to create subject
      And input name is "Tutorial BookRuby on Rails"

    When user click button Save in the new subject screen

    Then User should redirect to list subjects screen and name is "VPG" in show subjects screen

  Scenario: Create new subject with name is valid and contain space at both the ends
    Given user has a permission to create subject
      And input name is " Tutorial BookRuby on Rails "

    When user click button Save in the new subject screen

    Then User should redirect to list subjects screen and name is "Tutorial BookRuby on Rails" in show subjects screen

  Scenario: Create new subject with name is invalid and contain > 255 charaters
    Given user has a permission to create subject
      And input name is "Theo thông tin ban đầu, khoảng 10 giờ sáng 7-4, chị Giang Thị Thanh Thanh ngụ thôn 4, Đức Chính, Đức Linh (Bình Thuận) vừa ra khỏi phòng quay trở vào thì hoảng hốt khi không thấy đứa con gái vừa sinh 18 ngày tuổi của mình. Chị Thanh cùng chồng là anh Võ Ngọc Tuấn cùng gia đình tri hô và trình báo cho Công an huyện Đức Linh Theo thông tin ban đầu, khoảng 10 giờ sáng 7-4, chị Giang Thị Thanh Thanh ngụ thôn 4, Đức Chính, Đức Linh (Bình Thuận) vừa ra khỏi phòng quay trở vào thì hoảng hốt khi không thấy đứa con gái vừa sinh 18 ngày tuổi của mình. Chị Thanh cùng chồng là anh Võ Ngọc Tuấn cùng gia đình tri hô và trình báo cho Công an huyện Đức Linh"

    When user click button Save in the new subject screen

    Then User should redirect to list subjects screen message is "subject name is not created"

  Scenario: Create subject when description is empty
    Given user has a permission to create subject
      And Input description is "" and other items valid

    When user click button Save in the new subject screen

    Then User redirect to subjects screen and subject with description is "" in show subjects screen

  Scenario: Create subject when description include more than 0 characters
    Given user has a permission to create subject
      And Input description is "description" and other items valid

    When user click button Save in the new subject screen

    Then User redirect to subjects screen and subject with description is "description" in show subjects screen

  Scenario: Create subject when description include html, javascript
    Given user has a permission to create subject
      And Input description is "<script>alert('hello')</script>" and other items valid

    When user click button Save in the new subject screen

    Then User redirect to subjects screen and subject with description is "<script>alert('hello')</script>" in show subjects screen

  Scenario: Create subject when content empty
    Given user has a permission to create subject
      And Input content is "" and other items valid

    When user click button Save in the new subject screen

    Then User redirect to subjects screen and subject with content is "" in show subjects screen

  Scenario: Create subject when content include > 0 characters
    Given user has a permission to create subject
      And Input content is "content" and other items valid

    When user click button Save in the new subject screen

    Then User redirect to subjects screen and subject with content is "content" in show subjects screen

  Scenario: Create subject when content include html, javascript
    Given user has a permission to create subject
      And Input content is "<script>alert('hello')</script>" and other items valid

    When user click button Save in the new subject screen

    Then User redirect to subjects screen and subject with content is "<script>alert('hello')</script>" in show subjects screen

  Scenario: Create subject when during_time is blank
    Given user has a permission to create subject
      And Input during_time is "" and other items valid

    When user click button Save in the new subject screen

    Then Display message is "during_time not blank"

  Scenario: Create subject when during_time is "0"
    Given user has a permission to create subject
      And Input during_time is "0" and other items valid

    When user click button Save in the new subject screen

    Then Display message is "during_time invalid"

  Scenario: Create subject when during_time only contain number
    Given user has a permission to create subject
      And Input during_time is "5" and other items valid

    When user click button Save in the new subject screen

    Then User redirect to subjects screen and subject with during_time is "5" in show subjects screen

  Scenario: Create subject when during_time contain letter
    Given user has a permission to create subject
      And Input during_time is "mot" and other items valid

    When user click button Save in the new subject screen

    Then Display message is "during_time invalid"

  Scenario: Create subject when during_time contain special characters
    Given user has a permission to create subject
      And Input during_time is "1@!3" and other items valid

    When user click button Save in the new subject screen

    Then Display message is "during_time invalid"

  Scenario: Create subject when during_time contain html, javascript tags
    Given user has a permission to create subject
      And Input during_time is "<script>alert('1')</script>" and other items valid

    When user click button Save in the new subject screen

    Then Display message is "during_time invalid"

  Scenario: Update subject all fields valid
    Given User can update subject
      And Edit subject with image is "image.jpg", name is "project 1", description is "", content is "", during_time is "2"
      And Update to subject with image is "picture.jpg", name is "project 3", description is "content", content is "", during_time is "1"

    When user click button Save in the edit subject screen

    Then User redirect to subjects screen and subject with name is "project 1" updated

  Scenario: Update subject when all fields empty
    Given User can update subject
      And Edit subject with image is "image.jpg", name is "project 1", description is "", content is "", during_time is "2"
      And Update to subject with image is "", name is "", description is "", content is "", during_time is ""

    When user click button Save in the edit subject screen

    Then Display message "name is can't blank!"

  Scenario: Update subject when image empty
    Given User can update subject
      And Edit subject with image is "image.jpg", name is "project 1", description is "", content is "", during_time is "2"
      And Update to subject with image is "", name is "project 1", description is "", content is "", during_time is "2"

    When user click button Save in the edit subject screen

    Then User redirect to subjects screen and subject with name is "project 1" updated

  Scenario: Update subject when image have extension PNG
    Given User can update subject
      And Edit subject with image is "image.jpg", name is "project 1", description is "", content is "", during_time is "2"
      And Update to subject with image is "image.png", name is "project 1", description is "", content is "", during_time is "2"

    When user click button Save in the edit subject screen

    Then User redirect to subjects screen and subject with name is "project 1" updated

  Scenario: Update subject when image have extension JPG
    Given User can update subject
      And Edit subject with image is "image.jpg", name is "project 1", description is "", content is "", during_time is "2"
      And Update to subject with image is "image.jpg", name is "project 1", description is "", content is "", during_time is "2"

    When user click button Save in the edit subject screen

    Then User redirect to subjects screen and subject with name is "project 1" updated

  Scenario: Update subject when image have extension JPEG
    Given User can update subject
      And Edit subject with image is "image.jpg", name is "project 1", description is "", content is "", during_time is "2"
      And Update to subject with image is "image.jpeg", name is "project 1", description is "", content is "", during_time is "2"

    When user click button Save in the edit subject screen

    Then User redirect to subjects screen and subject with name is "project 1" updated

  Scenario: Update subject when image have extension GIF
    Given User can update subject
      And Edit subject with image is "image.jpg", name is "project 1", description is "", content is "", during_time is "2"
      And Update to subject with image is "image.gif", name is "project 1", description is "", content is "", during_time is "2"

    When user click button Save in the edit subject screen

    Then User redirect to subjects screen and subject with name is "project 1" updated

  Scenario: Update subject when image have extension TIF
    Given User can update subject
      And Edit subject with image is "image.jpg", name is "project 1", description is "", content is "", during_time is "2"
      And Update to subject with image is "image.tif", name is "project 1", description is "", content is "", during_time is "2"

    When user click button Save in the edit subject screen

    Then User redirect to subjects screen and subject with name is "project 1" updated

  Scenario: Update subject when image name is blank
    Given User can update subject
      And Edit subject with image is "image.jpg", name is "project 1", description is "", content is "", during_time is "2"
      And Update to subject with image is "image.tif", name is "", description is "", content is "", during_time is "2"

    When user click button Save in the edit subject screen

    Then Display message is "name is can't blank"

  Scenario: Update subject when image name is contain at both the end
    Given User can update subject
      And Edit subject with image is "image.jpg", name is "project 1", description is "", content is "", during_time is "2"
      And Update to subject with image is "image.tif", name is "project 1", description is "", content is "", during_time is "2"

    When user click button Save in the edit subject screen

    Then User redirect to subjects screen and subject with name is "project 1" updated

  Scenario: Update subject when image name is contain special characters
    Given User can update subject
      And Edit subject with image is "image.jpg", name is "project 1", description is "", content is "", during_time is "2"
      And Update to subject with image is "image.tif", name is "project@#1", description is "", content is "", during_time is "2"

    When user click button Save in the edit subject screen

    Then User redirect to subjects screen and subject with name is "project 1" updated

  Scenario: Update subject when image name is existed
    Given User can update subject
      And Edit subject with image is "image.jpg", name is "project 1", description is "", content is "", during_time is "2"
      And Update to subject with image is "image.tif", name is "project@#1", description is "", content is "", during_time is "2"

    When user click button Save in the edit subject screen

    Then User redirect to subjects screen and subject with name is "project 1" updated

  Scenario: Update subject when image more than 0M and less than 5M
    Given User can update subject
      And Edit subject with image is "image.jpg", name is "project 1", description is "", content is "", during_time is "2"
      And Update to subject with image is "image.tif" has size is 3M , name is "project@#1", description is "", content is "", during_time is "2"

    When user click button Save in the edit subject screen

    Then User redirect to subjects screen and subject with name is "project 1" updated

  Scenario: Update languge when imgage more than 5M
    Given User can update subject
      And Edit subject with image is "image.jpg", name is "project 1", description is "", content is "", during_time is "2"
      And Update to subject with image is "image.tif" has size is 6M , name is "project@#1", description is "", content is "", during_time is "2"

    When user click button Save in the new subject screen

    Then Display message "Size image more than 5M"

  Scenario: Update subject when image have extension doc
    Given User can update subject
      And Edit subject with image is "image.jpg", name is "project 1", description is "", content is "", during_time is "2"
      And Update to subject with image is "image.doc", name is "project 1", description is "", content is "", during_time is "2"

    When Input image

    Then Can not upload with image is "image.doc"

  Scenario: Update subject when image have extension docx
    Given User can update subject
      And Edit subject with image is "image.jpg", name is "project 1", description is "", content is "", during_time is "2"
      And Update to subject with image is "image.docx", name is "project 1", description is "", content is "", during_time is "2"

    When Input image

    Then Can not upload with image is "image.docx"

  Scenario: Update subject when image have extension xlsx
    Given User can update subject
      And Edit subject with image is "image.jpg", name is "project 1", description is "", content is "", during_time is "2"
      And Update to subject with image is "image.xlsx", name is "project 1", description is "", content is "", during_time is "2"

    When Input image

    Then Can not upload with image is "image.docx"

  Scenario: Update subject when image have extension xls
    Given User can update subject
      And Edit subject with image is "image.jpg", name is "project 1", description is "", content is "", during_time is "2"
      And Update to subject with image is "image.xls", name is "project 1", description is "", content is "", during_time is "2"

    When Input image

    Then Can not upload with image is "image.xls"

  Scenario: Update subject when image have extension csv
    Given User can update subject
      And Edit subject with image is "image.jpg", name is "project 1", description is "", content is "", during_time is "2"
      And Update to subject with image is "image.csv", name is "project 1", description is "", content is "", during_time is "2"

    When Input image

    Then Can not upload with image is "image.docx"

  Scenario: Update subject when name is empty
    Given User can update subject
      And Edit subject with image is "image.jpg", name is "project 1", description is "", content is "", during_time is "2"
      And Update to subject with image is "image.csv", name is "", description is "", content is "", during_time is "2"

    When user click button Save in the new subject screen

    Then Display message "name is don't empty!"
      And Button Save disable and can not click

  Scenario: Update subject when name include 1-255 characters
    Given User can update subject
      And Edit subject with image is "image.jpg", name is "project 1", description is "", content is "", during_time is "2"
      And Update to subject with image is "image.csv", name is "project 3", description is "", content is "", during_time is "2"

    When user click button Save in the edit subject screen

    Then User redirect to subjects screen and subject with name is "project 1" updated

  Scenario: Update subject when name include special characters
    Given User can update subject
      And Edit subject with image is "image.jpg", name is "project 1", description is "", content is "", during_time is "2"
      And Update to subject with image is "image.csv", name is "@project1", description is "", content is "", during_time is "2"

    When user click button Save in the edit subject screen

    Then User redirect to subjects screen and subject with name is "@project 1" updated

  Scenario: Update subject when name include html, javascript
    Given User can update subject
      And Edit subject with image is "image.jpg", name is "project 1", description is "", content is "", during_time is "2"
      And Update to subject with image is "image.csv", name is "<script>alert('hello')</script>", description is "", content is "", during_time is "2"

    When user click button Save in the edit subject screen

    Then User redirect to subjects screen and subject with name is "<script>alert('hello')</script>" updated

  Scenario: Update subject when name include space at both the end space
    Given User can update subject
      And Edit subject with image is "image.jpg", name is "project 1", description is "", content is "", during_time is "2"
      And Update to subject with image is "image.csv", name is " project3 ", description is "", content is "", during_time is "2"

    When user click button Save in the edit subject screen

    Then User redirect to subjects screen and subject with name is "project3" updated

  Scenario: Update subject when name more than 255 characters
    Given User can update subject
      And Edit subject with image is "image.jpg", name is "project 1", description is "", content is "", during_time is "2"
      And Update to subject with image is "image.jpg", name is "Câu chuyện là những trang nhật ký về cuộc sống thường ngày và tâm tư của cậu bé Thiều Thiều đang là học sinh lớp 7 sống ở một vùng quê nghèo cùng với người em trai tên Tường Tường là một cậu bé dễ thương hiền lành bao dung rất yêu mến anh trai và thích chơi đùa với nhiều loài động vật gồm cả sâu bọ ", description is "", content is "", during_time is "2"

    When user click button Save in the new subject screen

    Then Display message "name include 1-255 characters"

  Scenario: Update subject when description is empty
    Given User can update subject
      And Edit subject with image is "image.jpg", name is "project 1", description is "", content is "", during_time is "2"
      And Update to subject with image is "image.jpg", name is "project 1", description is "", content is "", during_time is "2"

    When user click button Save in the edit subject screen

    Then User redirect to subjects screen and subject with name is "project 1" updated

  Scenario: Update subject when description include more than 0 characters
    Given User can update subject
      And Edit subject with image is "image.jpg", name is "project 1", description is "", content is "", during_time is "2"
      And Update to subject with image is "image.jpg", name is "project 1", description is "description is", content is "", during_time is "2"

    When user click button Save in the edit subject screen

    Then User redirect to subjects screen and subject with name is "project 1" updated

  Scenario: Update subject when description include html, javascript
    Given User can update subject
      And Edit subject with image is "image.jpg", name is "project 1", description is "", content is "", during_time is "2"
      And Update to subject with image is "image.jpg", name is "project 1", description is "<script></script>", content is "", during_time is "2"

    When user click button Save in the edit subject screen

    Then User redirect to subjects screen and subject with name is "project 1" updated

  Scenario: Update subject when description include space at both the end
    Given User can update subject
      And Edit subject with image is "image.jpg", name is "project 1", description is "", content is "", during_time is "2"
      And Update to subject with image is "image.jpg", name is "project 1", description is " description is ", content is "", during_time is "2"

    When user click button Save in the edit subject screen

    Then User redirect to subjects screen and subject with name is "project 1" updated

    When user click button Save in the new subject screen

    Then Display message "name include 1-255 characters"

  Scenario: Update subject when content empty
    Given User can update subject
      And Edit subject with image is "image.jpg", name is "project 1", description is "", content is "", during_time is "2"
      And Update to subject with image is "image.jpg", name is "project 1", description is "", content is "", during_time is "2"

    When user click button Save in the edit subject screen

    Then User redirect to subjects screen and subject with name is "project 1" updated

  Scenario: Update subject when content include more than 0 characters
    Given User can update subject
      And Edit subject with image is "image.jpg", name is "project 1", description is "", content is "", during_time is "2"
      And Update to subject with image is "image.jpg", name is "project 1", description is "description is", content is "content", during_time is "2"

    When user click button Save in the edit subject screen

    Then User redirect to subjects screen and subject with name is "project 1" updated

  Scenario: Update subject when content include html, javascript
    Given User can update subject
      And Edit subject with image is "image.jpg", name is "project 1", description is "", content is "", during_time is "2"
      And Update to subject with image is "image.jpg", name is "project 1", content is "<script></script>", description is "", during_time is "2"

    When user click button Save in the edit subject screen

    Then User redirect to subjects screen and subject with name is "project 1" updated

  Scenario: Update subject when content include space at both the end
    Given User can update subject
      And Edit subject with image is "image.jpg", name is "project 1", description is "", content is "", during_time is "2"
      And Update to subject with image is "image.jpg", name is "project 1", description is " description is ", content is " content ", during_time is "2"

    When user click button Save in the edit subject screen

    Then User redirect to subjects screen and subject with name is "project 1" updated

  Scenario: Check filter when textbox filter is blank
    Given user has a permission to show all subjects
      And system has 3 subjects above
      And input filter is ""

    When input filter blank

    Then have not change in screen

  Scenario: Check filter when has result
    Given user has a permission to show all subjects
      And system has 3 subjects above
      And input filter is "Intern"

    When input data

    Then Display 3 records contain "Intern"

  Scenario: Check filter when textbox filter Contain "*" character
    Given user has a permission to show all subjects
      And input filter is "*"

    When input data

    Then display message is "No results found."

  Scenario: Check filter when textbox filter Contain "/" character
    Given user has a permission to show all subjects
      And input filter is "/"

    When input data

    Then display message is "No results found."

  Scenario: Check filter when textbox filter Input "0" character
    Given user has a permission to show all subjects
      And input filter is "0"

    When input data

    Then display message is "No results found."

  Scenario: check paginate when has <10 records
    Given user has a permission to show all subjects
      And system has 3 subjects above

    When subjects screen opened

    Then System display 3 records on form and has dropdown for paginate

  Scenario: check paginate when has 10 records
    Given user has a permission to show all subjects
      And system has 3 subjects above
      And system existed subject with name is "new dev, JPG, QA, BrSE, NT, new dev, old dev"

    When subjects screen opened

    Then System display 10 subjects on form and has dropdown for paginate

  Scenario: check paginate when has >10 records
    Given user has a permission to show all subjects
      And system has 3 subjects above
      And system existed subject with name is "new dev, JPG, QA, BrSE, NT, new dev, old dev, new QA"

    When subjects screen opened
      And user click button next

    Then System display 1 record in form

  Scenario: update subject when during_time is blank
    Given user has a permission to create subject
      And Edit subject with image is "image.jpg", name is "project 1", description is "", content is "", during_time is "2"
      And Update to subject with image is "image.jpg", name is "project 1", description is "description is", content is "content", during_time is ""

    When user click button Save in the edit subject screen

    Then Display message is "during_time not blank"

  Scenario: update subject when during_time is "0"
    Given user has a permission to create subject
      And Edit subject with image is "image.jpg", name is "project 1", description is "", content is "", during_time is "2"
      And Update to subject with image is "image.jpg", name is "project 1", description is "description is", content is "content", during_time is "0"

    When user click button Save in the new subject screen

    Then Display message is "during_time invalid"

  Scenario: update subject when during_time only contain number
    Given user has a permission to create subject
      And Edit subject with image is "image.jpg", name is "project 1", description is "", content is "", during_time is "2"
      And Update to subject with image is "image.jpg", name is "project 1", description is "description is", content is "content", during_time is "5"

    When user click button Save in the edit subject screen

    Then User redirect to subjects screen and subject with during_time is "5" updated

  Scenario: update subject when during_time contain letter
    Given user has a permission to create subject
      And Edit subject with image is "image.jpg", name is "project 1", description is "", content is "", during_time is "2"
      And Update to subject with image is "image.jpg", name is "project 1", description is "description is", content is "content", during_time is "abc"

    When user click button Save in the edit subject screen

    Then Display message is "during_time invalid"

  Scenario: update subject when during_time contain special characters
    Given user has a permission to create subject
      And Edit subject with image is "image.jpg", name is "project 1", description is "", content is "", during_time is "2"
      And Update to subject with image is "image.jpg", name is "project 1", description is "description is", content is "content", during_time is "a@bc"
    When user click button Save in the new subject screen

    Then Display message is "during_time invalid"

  Scenario: Create subject when during_time contain html, javascript tags
    Given user has a permission to create subject
      And Edit subject with image is "image.jpg", name is "project 1", description is "", content is "", during_time is "2"
      And Update to subject with image is "image.jpg", name is "project 1", description is "description is", content is "content", during_time is "<html>alert('abc')</html>"

    When user click button Save in the new subject screen

    Then Display message is "during_time invalid"

  Scenario: Deleting subject
    Given user has a permission to delete subject
      And user delete subject name is "New dev"

    When User click to delete symbol in the list subjects screen

    Then should redirect to list subjects screen and subject with name is "New dev" removed
