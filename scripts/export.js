/*


ALTO NIVEL DE GAMBIARRA


*/

const divContainer = document.querySelector('.container');
const divPopup = document.querySelector('.popup');
const divExport = divPopup.querySelector('.export');
const exportPreview = divExport.querySelector('.preview img');
const imageInfo = {
  originalSize: divExport.querySelector('#originalSize span'),
  scaledSize: divExport.querySelector('#scaledSize span'),
};
const inputScale = divExport.querySelector('#scale');
const scaleInfo = divExport.querySelector('.input-scale span');

inputScale.addEventListener('input', function () {
  scaleInfo.innerText = `${this.value}x`;

  const width = exportPreview.naturalWidth * this.value;
  const height = exportPreview.naturalHeight * this.value;
  imageInfo.scaledSize.innerText = `${width}x${height}`;
});

function showPopup() {
  divPopup.style.visibility = 'visible';
  divPopup.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';

  divExport.style.transform = 'translateY(0)';

  divContainer.style.filter = 'blur(2px)';
}

function hidePopup() {
  divPopup.style.visibility = 'hidden';
  divPopup.style.backgroundColor = 'transparent';

  divExport.style.transform = 'translateY(-100vh)';

  divContainer.style.filter = 'blur(0)';
}

function startExport() {
  const { src, naturalWidth, naturalHeight } = preview;
  const sizeString = `${naturalWidth}x${naturalHeight}`;

  exportPreview.src = src;

  imageInfo.originalSize.innerText = sizeString;
  imageInfo.scaledSize.innerText = sizeString;

  inputScale.value = 1;
  scaleInfo.innerText = '1x';

  showPopup();
}

function exportImage(action, button) {
  if (!exportPreview.naturalWidth) return;

  createImageBitmap(exportPreview, {
    resizeWidth: exportPreview.naturalWidth * inputScale.value,
    resizeHeight: exportPreview.naturalHeight * inputScale.value,
    resizeQuality: 'pixelated',
  })
    .then((imageBitmap) => {
      return new Promise((resolve) => {
        const canvas = document.createElement('canvas');

        canvas.width = imageBitmap.width;
        canvas.height = imageBitmap.height;

        let ctx = canvas.getContext('bitmaprenderer');

        if (ctx) {
          ctx.transferFromImageBitmap(imageBitmap);
        } else {
          ctx = canvas.getContext('2d');
          ctx.drawImage(imageBitmap, 0, 0);
        }

        canvas.toBlob(resolve);
      });
    })
    .then((blob) => {
      if (action == 'download') {
        const url = URL.createObjectURL(blob);

        const link = document.createElement('a');
        link.href = url;
        link.download = 'bidi';
        link.click();

        infoPopupShow('#009c34', 'Download iniciado!');
      } else if (action == 'copy') {
        try {
          navigator.clipboard.write([
            new ClipboardItem({
              'image/png': blob,
            }),
          ]);

          infoPopupShow('#009c34', 'Copiado para a área de transferência!');
        } catch (error) {
          infoPopupShow('#c50000', 'Ocorreu um erro ao tentar copiar!');
        }
      }
    });
}

const infoPopup = document.querySelector('.info-popup');
const infoPopupText = infoPopup.querySelector('p');
let timer;

function infoPopupShow(color, message) {
  infoPopupText.innerText = message;
  infoPopup.style.backgroundColor = color;
  infoPopup.style.visibility = 'visible';
  infoPopup.style.transform = 'translateY(0)';

  timer = setTimeout(() => {
    if (timer) {
      clearTimeout(timer);
    }

    infoPopup.style.transform = 'translateY(-350px)';
    infoPopup.style.visibility = 'hidden';
  }, 3000);
}
