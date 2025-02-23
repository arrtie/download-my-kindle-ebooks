import { findInChildren, getElementFrom, makeTitleMap } from "./elementHelpers";
const DOWNLOAD_OPTION_TEXT = "Download & transfer via USB";
const DOWNLOAD_DIALOG_CONTAINER = "[id^='DOWNLOAD_AND_TRANSFER_DIALOG']";
const DOWNLOAD_BUTTON = "[id$='CONFIRM']";

interface FullRow {
  title: string;
  row: HTMLElement;
  openDialogButton: HTMLElement;
  dialog: HTMLElement;
}


function confirmAndClick(getter: () => HTMLElement | null, errorText: string) {
    const el = getter();
    if (el == null) {
        console.warn(errorText)
      return false;
    }
    el.click();
    return true;
  }
  

async function tryAgain(action: () => HTMLElement | null, count: number, elementName:string) {
  if (count == 0) {
    console.warn(`ran out of retries getting ${elementName}`);
    return Promise.resolve(false);
  }
  
  if(confirmAndClick(action, `failed to find ${elementName}`)){
    console.log("Success!");
    return Promise.resolve(true);
  }

  return new Promise((resolve) => {
    console.warn("trying again");
    setTimeout(() => {
      resolve(tryAgain(action, count - 1, elementName));
    }, 1000);
  });
}

export default async function downloadBooksFromCurrentPage() {
  const titleMap = makeTitleMap();
  if (titleMap == null) {
    console.error("no title map");
    return;
  }
  const rowsWithDialog = Array.from(titleMap.entries())
    .map(([title, row]) => {
      return {
        title,
        row,
        openDialogButton: findInChildren(row, DOWNLOAD_OPTION_TEXT),
        dialog: getElementFrom(row)(DOWNLOAD_DIALOG_CONTAINER),
      };
    })
    .filter(
      (maybeDialogElements): maybeDialogElements is FullRow =>
        maybeDialogElements.openDialogButton != null &&
        maybeDialogElements.dialog != null
    );

  while (rowsWithDialog.length > 0) {
    const currentRow = rowsWithDialog.shift();
    if (currentRow == null) {
      break;
    }
    currentRow.openDialogButton.click();
    const getFromDialog = getElementFrom(currentRow.dialog);
    const getRadioButton = () => getFromDialog("input[type='radio']");
    if (!confirmAndClick(getRadioButton, "missing radio button")) {
      break;
    }
    const getConfirmButton = () => getFromDialog(DOWNLOAD_BUTTON);

    if (!confirmAndClick(getConfirmButton, "missing confirm download button")) {
      break;
    }
    const result = await tryAgain(() => {
      return getElementFrom(document.documentElement)(
        "[id='notification-close']"
      );
    }, 3, "success notification close button");
  }
}
