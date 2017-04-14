Feature: Language
  In order to manage language.
  As an admintrator.
  I want to manage language.

  Background:
    Given User with email is "admin@tms.com" and password "12345678"
      And User manage language include create, show, update, delete.
      And System existed languages with name "Ruby, Rails, Ruby on rails"

    When User login

    Then I should redirect to Home screen.

  Scenario: Create language when all fields valid
    Given User can create language
      And Input image is "anh.png", name "ruby" and description "content"

    When In the Languages screen. User click button Save.

    Then I should redirect to show "ruby" screen.

  Scenario: Create language when all fields empty
    Given User can create language
      And Input image, name and description empty

    When In the Languages screen. User click button Save.

    Then Display message "All fields don't empty!"

  Scenario: Create language when image empty
    Given User can create language
      And Input image "" and other items valid

    When In the Languages screen. User click button Save.

    Then Display message "Image don't empty!"
      And Button Save disable and can not click

  Scenario: Create language when image have extension PNG
    Given User can create language
      And Input image "anh.png" and other items valid

    When In the Languages screen. User click button Save.

    Then I should redirect to show "ruby" screen.

  Scenario: Create language when image have extension JPG
    Given User can create language
      And Input image "anh.jpg" and other items valid

    When In the Languages screen. User click button Save.

    Then I should redirect to show "ruby" screen.

  Scenario: Create language when image have extension JPEG
    Given User can create language
      And Input image "anh.jpeg" and other items valid

    When In the Languages screen. User click button Save.

    Then I should redirect to show "ruby" screen.

  Scenario: Create language when image have extension GIF
    Given User can create language
      And Input image "anh.gif" and other items valid

    When In the Languages screen. User click button Save.

    Then I should redirect to show "ruby" screen.

  Scenario: Create language when image have extension TIF
    Given User can create language
      And Input image "anh.tif" and other items valid

    When In the Languages screen. User click button Save.

    Then I should redirect to show "ruby" screen.

  Scenario: Create language when image name is blank
    Given User can create language
      And Input image ".png" and other items valid

    When In the Languages screen. User click button Save.

    Then I should redirect to show "ruby" screen.

  Scenario: Create language when image name contain space or some special characters
    Given User can create language
      And Input image "anh cat.png" and other items valid

    When In the Languages screen. User click button Save.

    Then I should redirect to show "ruby" screen.

  Scenario: Create language when image name the same old image name
    Given User can create language
      And Input image "anh.png" and other items valid

    When In the Languages screen. User click button Save.

    Then I should redirect to show "ruby" screen.

  Scenario: Create languge when image more than 0M and less than 5M
    Given User can create language
      And Input image "anh.png" have size "3M" and other items valid

    When In the Languages screen. User click button Save.

    Then I should redirect to show "ruby" screen.

  Scenario: Create languge when imgage more than 5M
    Given User can create language
      And Input image "anh.png" have size "6M" and other items valid

    When In the Languages screen. User click button Save.

    Then Display message "Size image more than 5M"

  Scenario: Create language when image have extension doc
    Given User can create language
      And Input image "anh.doc" and other items valid

    When In the Languages screen. User click button Save.

    Then Display message "Image only extension: jpg, png, jpeg, gif, tif"

  Scenario: Create language when image have extension docx
    Given User can create language
      And Input image "anh.docx" and other items valid

    When In the Languages screen. User click button Save.

    Then Display message "Image only extension: jpg, png, jpeg, gif, tif"

  Scenario: Create language when image have extension docx
    Given User can create language
      And Input image "anh.docx" and other items valid

    When In the Languages screen. User click button Save.

    Then Display message "Image only extension: jpg, png, jpeg, gif, tif"

  Scenario: Create language when image have extension xlsx
    Given User can create language
      And Input image "anh.xlsx" and other items valid

    When In the Languages screen. User click button Save.

    Then Display message "Image only extension: jpg, png, jpeg, gif, tif"

  Scenario: Create language when image have extension xls
    Given User can create language
      And Input image "anh.xls" and other items valid

    When In the Languages screen. User click button Save.

    Then Display message "Image only extension: jpg, png, jpeg, gif, tif"

  Scenario: Create language when image have extension csv
    Given User can create language
      And Input image "anh.csv" and other items valid

    When In the Languages screen. User click button Save.

    Then Display message "Image only extension: jpg, png, jpeg, gif, tif"

  Scenario: Create language when multiple images upload
    Given User can create language
      And Input image "anh.png", "picture.jpg",  "image.jpeg" and other items valid

    When In the Languages screen. User click button Save.

    Then Display message "Don't upload"

  Scenario: Create language when name empty
    Given User can create language
      And Input name "" and other items valid

    When In the Languages screen. User click button Save.

    Then Display message "Name don't empty!"
      And Button Save disable and can not click

  Scenario: Create language when name include 1-255 characters
    Given User can create language
      And Input name "Ruby on rails" and other items valid

    When In the Languages screen. User click button Save.

    Then I should redirect to show "ruby" screen.

  Scenario: Create language when name include special characters
    Given User can create language
      And Input name "Ruby@on$#rails" and other items valid

    When In the Languages screen. User click button Save.

    Then I should redirect to show "ruby" screen.

  Scenario: Create language when name include html, javascript
    Given User can create language
      And Input name "<script>alert('hello')</script>" and other items valid

    When In the Languages screen. User click button Save.

    Then I should redirect to show "ruby" screen.

  Scenario: Create language when name include space
    Given User can create language
      And Input name "Ruby on rails" and other items valid

    When In the Languages screen. User click button Save.

    Then I should redirect to show "ruby" screen.

  Scenario: Create language when name more than 255 characters
    Given User can create language
      And Input name "Câu chuyện là những trang nhật ký về cuộc sống thường ngày và tâm tư của cậu bé Thiều Thiều đang là học sinh lớp 7 sống ở một vùng quê nghèo cùng với người em trai tên Tường Tường là một cậu bé dễ thương hiền lành bao dung rất yêu mến anh trai và thích chơi đùa với nhiều loài động vật gồm cả sâu bọ Cậu bé sống nội tâm ham đọc sách và rất say mê những câu chuyện cổ tích đặc biệt là truyện Cóc tía chính vì vậy mà cậu nuôi nấng một con cóc dưới gầm giường và đặt tên cho nó là Cu Cau" and other items valid

    When In the Languages screen. User click button Save.

    Then Display message "Name include 1-255 characters"

  Scenario: Create language when description empty
    Given User can create language
      And Input description "" and other items valid

    When In the Languages screen. User click button Save.

    Then I should redirect to show "ruby" screen.
      And Button Save disable and can not click

  Scenario: Create language when description include more than 0 characters
    Given User can create language
      And Input description "Description" and other items valid

    When In the Languages screen. User click button Save.

    Then I should redirect to show "ruby" screen.

  Scenario: Create language when description include html, javascript
    Given User can create language
      And Input description "<script>alert('hello')</script>" and other items valid

    When In the Languages screen. User click button Save.

    Then I should redirect to show "ruby" screen.

  Scenario: Create language when description include space
    Given User can create language
      And Input description "Content description" and other items valid

    When In the Languages screen. User click button Save.

    Then I should redirect to show "ruby" screen.

  Scenario: Update language all fields valid
    Given User can update language
      And Edit language with image is "image.jpg", name "Rails" and description "content"
      And Update to language with image is "picture.jpg", name "Ruby on rails" and description "content"

    When In the Languages screen. User click button Save.

    Then I should redirect to show "Ruby on rails" screen.

  Scenario: Update language when all fields empty
    Given User can update language
      And Edit language with image is "image.jpg", name "Rails" and description "content"
      And Update to language with image is "", name "" and description ""

    When In the Languages screen. User click button Save.

    Then Display message "All fields don't empty!"

  Scenario: Update language when image empty
    Given User can update language
      And Edit language with image is "image.jpg", name "Rails" and description "content"
      And Update to language with image is "", name "PHP" and description "content"

    When In the Languages screen. User click button Save.

    Then Display message "Image don't empty!"
      And Button Save disable and can not click

  Scenario: Update language when image have extension PNG
    Given User can update language
      And Edit language with image is "image.jpg", name "Rails" and description "content"
      And Update to language with image is "anh.png", name "PHP" and description "content"

    When In the Languages screen. User click button Save.

    Then I should redirect to show "Ruby on rails" screen.

  Scenario: Update language when image have extension JPG
    Given User can update language
      And Edit language with image is "image.jpg", name "Rails" and description "content"
      And Update to language with image is "anh.jpg", name "PHP" and description "content"

    When In the Languages screen. User click button Save.

    Then I should redirect to show "Ruby on rails" screen.

  Scenario: Update language when image have extension JPEG
    Given User can update language
      And Edit language with image is "image.jpg", name "Rails" and description "content"
      And Update to language with image is "anh.jpeg", name "PHP" and description "content"

    When In the Languages screen. User click button Save.

    Then I should redirect to show "Ruby on rails" screen.

  Scenario: Update language when image have extension GIF
    Given User can update language
      And Edit language with image is "image.jpg", name "Rails" and description "content"
      And Update to language with image is "anh.gif", name "PHP" and description "content"

    When In the Languages screen. User click button Save.

    Then I should redirect to show "Ruby on rails" screen.

  Scenario: Update language when image have extension TIF
    Given User can update language
      And Edit language with image is "image.jpg", name "Rails" and description "content"
      And Update to language with image is "anh.tif", name "PHP" and description "content"

    When In the Languages screen. User click button Save.

    Then I should redirect to show "Ruby on rails" screen.

  Scenario: Update language when image name is blank
    Given User can update language
      And Edit language with image is "image.jpg", name "Rails" and description "content"
      And Update to language with image is ".png", name "PHP" and description "content"

    When In the Languages screen. User click button Save.

    Then I should redirect to show "Ruby on rails" screen.

  Scenario: Update language when image name contain space or some special characters
    Given User can update language
      And Edit language with image is "image.jpg", name "Rails" and description "content"
      And Update to language with image is "anh cat.png", name "PHP" and description "content"

    When In the Languages screen. User click button Save.

    Then I should redirect to show "Ruby on rails" screen.

  Scenario: Update language when image name the same old image name
    Given User can update language
      And Edit language with image is "image.jpg", name "Rails" and description "content"
      And Update to language with image is "anh.png", name "PHP" and description "content"

    When In the Languages screen. User click button Save.

    Then I should redirect to show "Ruby on rails" screen.

  Scenario: Update languge when image more than 0M and less than 5M
    Given User can update language
      And Edit language with image is "image.jpg", name "Rails" and description "content"
      And Update to language with image "anh.png" have size "3M" , name "PHP" and description "content"

    When In the Languages screen. User click button Save.

    Then I should redirect to show "Ruby on rails" screen.

  Scenario: Update languge when imgage more than 5M
    Given User can update language
      And Edit language with image is "image.jpg", name "Rails" and description "content"
      And Update to language with image "anh.png" have size "6M" , name "PHP" and description "content"

    When In the Languages screen. User click button Save.

    Then Display message "Size image more than 5M"

  Scenario: Update language when image have extension doc
    Given User can update language
      And Edit language with image is "image.jpg", name "Rails" and description "content"
      And Update to language with image "anh.doc", name "PHP" and description "content"

    When In the Languages screen. User click button Save.

    Then Display message "Image only extension: jpg, png, jpeg, gif, tif"

  Scenario: Update language when image have extension docx
    Given User can update language
      And Edit language with image is "image.jpg", name "Rails" and description "content"
      And Update to language with image "anh.docx", name "PHP" and description "content"

    When In the Languages screen. User click button Save.

    Then Display message "Image only extension: jpg, png, jpeg, gif, tif"

  Scenario: Update language when image have extension xlsx
    Given User can update language
      And Edit language with image is "image.jpg", name "Rails" and description "content"
      And Update to language with image "anh.xlsx", name "PHP" and description "content"

    When In the Languages screen. User click button Save.

    Then Display message "Image only extension: jpg, png, jpeg, gif, tif"

  Scenario: Update language when image have extension xls
    Given User can update language
      And Edit language with image is "image.jpg", name "Rails" and description "content"
      And Update to language with image "anh.xls", name "PHP" and description "content"

    When In the Languages screen. User click button Save.

    Then Display message "Image only extension: jpg, png, jpeg, gif, tif"

  Scenario: Update language when image have extension csv
    Given User can update language
      And Edit language with image is "image.jpg", name "Rails" and description "content"
      And Update to language with image "anh.csv", name "PHP" and description "content"

    When In the Languages screen. User click button Save.

    Then Display message "Image only extension: jpg, png, jpeg, gif, tif"

  Scenario: Update language when multiple images upload
    Given User can update language
      And Edit language with image is "image.jpg", name "Rails" and description "content"
      And Update to language with image "anh.jpg", "pic.png", "image.png", name "PHP" and description "content"

    When In the Languages screen. User click button Save.

    Then Display message "Don't upload"

  Scenario: Update language when name empty
    Given User can update language
      And Edit language with image is "image.jpg", name "Rails" and description "content"
      And Update to language with image "anh.png", name "" and description "content"

    When In the Languages screen. User click button Save.

    Then Display message "Name don't empty!"
      And Button Save disable and can not click

  Scenario: Update language when name include 1-255 characters
    Given User can update language
      And Edit language with image is "image.jpg", name "Rails" and description "content"
      And Update to language with image "anh.png", name "Android" and description "content"

    When In the Languages screen. User click button Save.

    Then I should redirect to show "PHP" screen.

  Scenario: Update language when name include special characters
    Given User can update language
      And Edit language with image is "image.jpg", name "Rails" and description "content"
      And Update to language with image "anh.png", name "Ruby@on$#rails" and description "content"

    When In the Languages screen. User click button Save.

    Then I should redirect to show "Ruby@on$#rails" screen.

  Scenario: Update language when name include html, javascript
    Given User can update language
      And Edit language with image is "image.jpg", name "Rails" and description "content"
      And Update to language with image "anh.png", name "<script>alert('hello')</script>" and description "content"

    When In the Languages screen. User click button Save.

    Then I should redirect to show "<script>alert('hello')</script>" screen.

  Scenario: Update language when name include space
    Given User can update language
      And Edit language with image is "image.jpg", name "Rails" and description "content"
      And Update to language with image "anh.png", name "Ruby on rails" and description "content"

    When In the Languages screen. User click button Save.

    Then I should redirect to show "Ruby on rails" screen.

  Scenario: Update language when name more than 255 characters
    Given User can update language
      And Edit language with image is "image.jpg", name "Rails" and description "content"
      And Update to language with image "anh.png", name "Câu chuyện là những trang nhật ký về cuộc sống thường ngày và tâm tư của cậu bé Thiều Thiều đang là học sinh lớp 7 sống ở một vùng quê nghèo cùng với người em trai tên Tường Tường là một cậu bé dễ thương hiền lành bao dung rất yêu mến anh trai và thích chơi đùa với nhiều loài động vật gồm cả sâu bọ " and description "content"

    When In the Languages screen. User click button Save.

    Then Display message "Name include 1-255 characters"

  Scenario: Update language when description empty
    Given User can update language
      And Edit language with image is "image.jpg", name "Rails" and description "content"
      And Update to language with image "anh.png", name "Ruby on rails" and description ""

    When In the Languages screen. User click button Save.

    Then I should redirect to show "Ruby on rails" screen.
      And Button Save disable and can not click

  Scenario: Update language when description include more than 0 characters
    Given User can update language
      And Edit language with image is "image.jpg", name "Rails" and description "content"
      And Update to language with image "anh.png", name "Ruby on rails" and description "content"

    When In the Languages screen. User click button Save.

    Then I should redirect to show "Ruby on rails" screen.

  Scenario: Update language when description include html, javascript
    Given User can update language
      And Edit language with image is "image.jpg", name "Rails" and description "content"
      And Update to language with image "anh.png", name "Ruby on rails" and description "<script>alert('hello')</script>"

    When In the Languages screen. User click button Save.

    Then I should redirect to show "Ruby on rails" screen.

  Scenario: Update language when description include space
    Given User can update language
      And Edit language with image is "image.jpg", name "Rails" and description "content"
      And Update to language with image "anh.png", name "Ruby on rails" and description "sub content"

    When In the Languages screen. User click button Save.

    Then I should redirect to show "Ruby on rails" screen.

  Scenario: Delete language
    Given User can delete language
      And User want to delete language with image is "picture.jpg", name "Ruby on rails" and description "content"

    When In the list Languages screen. User click to delete symbol.

    Then Language with image is "picture.jpg", name "Ruby on rails" and description "content" deleted and should redirect to list languages screen.

  Scenario: Check filter when filter empty
    Given User can show language
      And Input filter ""

    When In the list languges screen, user insert data

    Then Display no record

  Scenario: Check filter when data exist in database and input filter 1-255 characters
    Given User can show language
      And Input filter "Ruby"

    When In the list language screen, user insert data

    Then Display all record with data name contain "Ruby"

  Scenario: Check filter when data exist in database and input filter contain special characters
    Given User can show language
      And Input filter "#$"

    When In the list language screen, user insert data

    Then Display all record with data name contain "#$"

  Scenario: Check filter when data exist in database and input filter contain html, javascript
    Given User can show language
      And Input filter "<script>alert('hello')</script>"

    When In the list language screen, user insert data

    Then Display all record with data name contain "<script>alert('hello')</script>"

  Scenario: Check filter when data exist in database and input filter contain space
    Given User can show language
      And Input filter "Ruby on rails"

    When In the list language screen, user insert data

    Then Display all record with data name contain "Ruby on rails"

  Scenario: Check filter when data don't exist in database and input filter more than 255 characters
    Given User can show language
      And Input filter "Câu chuyện là những trang nhật ký về cuộc sống thường ngày và tâm tư của cậu bé Thiều Thiều đang là học sinh lớp 7 sống ở một vùng quê nghèo cùng với người em trai tên Tường Tường là một cậu bé dễ thương hiền lành bao dung rất yêu mến anh trai và thích chơi đùa với nhiều loài động vật gồm cả sâu bọ"

    When In the list language screen, user insert data

    Then Display all record with data name contain "Câu chuyện là những trang nhật ký về cuộc sống thường ngày và tâm tư của cậu bé Thiều Thiều đang là học sinh lớp 7 sống ở một vùng quê nghèo cùng với người em trai tên Tường Tường là một cậu bé dễ thương hiền lành bao dung rất yêu mến anh trai và thích chơi đùa với nhiều loài động vật gồm cả sâu bọ"

  Scenario: Check filter when data is *
    Given User can show language
      And Input filter "*"

    When In the list language screen, user insert data

    Then Display all record with data name contain "*"

  Scenario: Check filter when data is /
    Given User can show language
      And Input filter "/"

    When In the list language screen, user insert data

    Then Display all record with data name contain "/"

  Scenario: Check filter when data is _
    Given User can show language
      And Input filter "_"

    When In the list language screen, user insert data

    Then Display all record with data name contain "_"

  Scenario: Check filter when data is 0
    Given User can show language
      And Input filter "0"

    When In the list language screen, user insert data

    Then Display all record with data name contain "0"

  Scenario: Check paginate when data <10 records
    Given User can show all languages
      And System has 3 languages above

    When User open language screen

    Then Display all records in the a page


  Scenario: Check paginate when data have 10 records
    Given User can show all languages
      And system has 3 languages above
      And system existed language with name is "Pascal, C, Java, Android, Python, PHP, IOS"

    When User open language screen

    Then Display all records in the a page

  Scenario: Check paginate when data >10 records
    Given User can show all languages
      And system has 3 languages above
      And system existed language with name is "Pascal, C, Java, Android, Python, PHP, IOS, C++"
    When User open language screen
      And User click button Next

    Then The first page include 10 records
      And the second page include 1 record
