# Download Kindle E-books

## Why?

Amazon will no longer be offering downloads for kindle book purchases made after 2025-02-26. Downloading every book one-by-one is enough to disuade people from going through the process. You should be allowed to keep access to what you have already paid for.

> Safety Warning: pasting code into your developer console is always a security risk. Particularly when logged into websites that contain your payment information. Be sure you're confident in the code's source before using it.

## Limitations

- this script is only tested in the latest Google Chrome
- you MUST have a physical device capable of usb transfer or you won't have the `More Actions` option to `download & transfer via USB`
- this script assumes you're using english as your prefered language

## How to use this script

- Within this repo, navigate to dist > bundle.js > copy the contents
  - or click [here](https://github.com/arrtie/download-my-kindle-ebooks/blob/main/dist/bundle.js)
- copy the contents of the file
- Log into your Amazon account
- open your digital books library at [this url](https://www.amazon.com/hz/mycd/digital-console/contentlist/booksPurchases/dateDsc?pageNumber=1)
  - or from the header select the `Accounts & Lists` menu > click `Content Library` > `Books`
  - change `View: Books All` to `View: Books Purchases`
  - this URL selects **PURCHASED** books, changing which books are displayed via a dropdown may impact your results
- Open Chrome Dev Tools
  - mac: `cmd + opt + j`
  - windows: `ctrl + opt + j`
  - mouse: `right click > inspect`
- select the `Console` tab
- paste the code from `/dist/bundle.js`(step 1) and press enter
  - your books should slowly be downloaded one by one.
- you'll need to select the next page and repeat `paste + enter` within the Console

## Final notes

- open an issue if you're having a problem
- open an PR if you'd like to contribute
  - error checking
  - internationalization
