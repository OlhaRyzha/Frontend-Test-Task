// import {calculatorForDesktop} from './calculator-for-dc';
const form = document.querySelector('.form');
const container = document.querySelector('.diagram__list');
const cort = [...document.querySelectorAll('.cort')];
const text = [...document.querySelectorAll('.text')];
const labelForStorage = document.querySelector('label[for="storage-range"]');
const labelForTransfer = document.querySelector('label[for="transfer-range"]');
const inputForStorage = document.querySelector('input[name="storage"]');
const inputForTransfer = document.querySelector('input[name="transfer"]');
form.addEventListener('change', onRangeChange);
const title = document.querySelector('h1');
const hint = [...document.querySelectorAll('span')];
const multi = document.querySelector('#Multi');
const single = document.querySelector('#Single');
const hdd = document.querySelector('#HDD');
const ssd = document.querySelector('#SSD');
const wrap = [...document.querySelectorAll('.label-wrap')];

wrap[0].addEventListener('change', () => {
  if (window.innerWidth >= 1140) {
    calculatorForDesktop();
  }
  if (window.innerWidth < 1140) {
    calculatorForStorage();
  }
});
wrap[1].addEventListener('change', () => {
  if (window.innerWidth >= 1140) {
    calculatorForDesktop();
  }
  if (window.innerWidth < 1140) {
    calculatorForStorage();
  }
});

global.addEventListener('resize', () => {
  if (window.innerWidth >= 1140) {
    location.reload();
  }
  if (window.innerWidth < 1140) {
    location.reload();
  }
});
async function onRangeChange(e) {
  const { target } = e;
  const { name, value } = target;

  if (target.nodeName !== 'INPUT') {
    return;
  }

  switch (name) {
    case 'storage':
      labelForStorage.textContent = `Storage: ${value} GB`;

      // console.log()
      if (window.innerWidth >= 1140) {
        calculatorForDesktop();
      }
      if (window.innerWidth < 1140) {
        calculatorForStorage();
      }
      break;
    case 'transfer':
      labelForTransfer.textContent = `Transfer: ${value} GB`;
      if (window.innerWidth >= 1140) {
        calculatorForDesktop();
      }
      if (window.innerWidth < 1140) {
        calculatorForStorage();
      }

      break;
    default:
      '';
  }
}

async function calculatorForStorage() {
  
  const storageValue = inputForStorage.value;
  const transferValue = inputForTransfer.value;

  cort[0].style.height = `${
    (storageValue * 0.005 + transferValue * 0.01 < 7
      ? 7
      : storageValue * 0.005 + transferValue * 0.01) * 8
  }px`;
  hint[0].classList.remove('visually-hidden');
  hint[0].textContent = `${(
    Number(cort[0].style.height.replace('px', '')) / 8
  ).toFixed(1)} $ for ${Number(storageValue) + Number(transferValue)} GB`;

  if (hdd.checked) {
    cort[1].style.height = `${
      (storageValue * 0.01 + transferValue * 0.01 > 10
        ? 10
        : storageValue * 0.01 + transferValue * 0.01) * 8
    }px`;
    hint[1].classList.remove('visually-hidden');
    hint[1].textContent = `${(
      Number(cort[1].style.height.replace('px', '')) / 8
    ).toFixed(1)} $ for ${Number(storageValue) + Number(transferValue)} GB`;
  }
  if (ssd.checked) {
    if (storageValue * 0.02 + transferValue * 0.01 > 10) {
      cort[1].style.height = '80px';
      hint[1].textContent = `${(
        Number(cort[1].style.height.replace('px', '')) / 8
      ).toFixed(1)} $ for 500 GB`;
    } else {
      cort[1].style.height = `${
        (storageValue * 0.02 + transferValue * 0.01) * 8
      }px`;
      hint[1].classList.remove('visually-hidden');
      hint[1].textContent = `${(
        Number(cort[1].style.height.replace('px', '')) / 8
      ).toFixed(1)} $ for ${Number(storageValue) + Number(transferValue)} GB`;
    }
  }
  const sum = Number(storageValue) + Number(transferValue);
  if (multi.checked) {
    if (sum <= 150) {
      cort[2].style.height = '0px';
      hint[2].classList.remove('visually-hidden');
      hint[2].textContent = `0$ for ${sum} GB`;
    } else {
      cort[2].style.height = `${
        ((Number(storageValue) - 75) * 0.06 +
          (Number(transferValue) - 75) * 0.02) *
        8
      }px`;
      hint[2].classList.remove('visually-hidden');
      hint[2].textContent = `${(
        Number(cort[2].style.height.replace('px', '')) / 8
      ).toFixed(1)} $ for ${sum} GB`;
      if (Number(cort[2].style.height.replace('px', '')) > 430) {
        cort[2].style.height = '430px';
      }
    }
  }
  if (single.checked) {
    if (sum <= 150) {
      cort[2].style.height = '0px';
      hint[2].classList.remove('visually-hidden');
      hint[2].textContent = `0$ for ${
        Number(storageValue) + Number(transferValue)
      } GB`;
    } else {
      cort[2].style.height = `${
        ((Number(storageValue) - 75) * 0.03 +
          (Number(transferValue) - 75) * 0.02) *
        8
      }px`;
      hint[2].classList.remove('visually-hidden');
      hint[2].textContent = `${(
        Number(cort[2].style.height.replace('px', '')) / 8
      ).toFixed(1)} $ for ${Number(storageValue) + Number(transferValue)} GB`;
    }
  }

  cort[3].style.height = `${
    (storageValue * 0.01 + transferValue * 0.01 < 5
      ? 5
      : storageValue * 0.01 + transferValue * 0.01) * 8
  }px`;
  hint[3].classList.remove('visually-hidden');
  hint[3].textContent = `${(
    Number(cort[3].style.height.replace('px', '')) / 8
  ).toFixed(1)} $ for ${Number(storageValue) + Number(transferValue)} GB`;

  cort.map(el => (el.style.backgroundColor = '#54545430'));
  cort.find(
    el =>
      el.style.height ===
      `${Math.min(
        ...cort.map(el => Number(el.style.height.replace('px', '')))
      )}px`
  ).style.backgroundColor = 'rgb(207 30 90 / 66%)';
}

async function calculatorForDesktop() {
  const storageValue = inputForStorage.value;
  const transferValue = inputForTransfer.value;

  cort[0].style.width = `${
    (storageValue * 0.005 + transferValue * 0.01 < 7
      ? 7
      : storageValue * 0.005 + transferValue * 0.01) * 80
  }px`;
  hint[0].classList.remove('visually-hidden');
  hint[0].textContent = `${(
    Number(cort[0].style.width.replace('px', '')) / 80
  ).toFixed(1)} $ for ${Number(storageValue) + Number(transferValue)} GB`;

  if (hdd.checked) {
    cort[1].style.width = `${
      (storageValue * 0.01 + transferValue * 0.01 > 10
        ? 10
        : storageValue * 0.01 + transferValue * 0.01) * 80
    }px`;
    hint[1].classList.remove('visually-hidden');
    hint[1].textContent = `${(
      Number(cort[1].style.width.replace('px', '')) / 80
    ).toFixed(1)} $ for ${Number(storageValue) + Number(transferValue)} GB`;
  }
  if (ssd.checked) {
    if (storageValue * 0.02 + transferValue * 0.01 > 10) {
      cort[1].style.width = '80px';
      hint[1].textContent = `${(
        Number(cort[1].style.widtht.replace('px', '')) / 80
      ).toFixed(1)} $ for 500 GB`;
    } else {
      cort[1].style.width = `${
        (storageValue * 0.02 + transferValue * 0.01) * 80
      }px`;
      hint[1].classList.remove('visually-hidden');
      hint[1].textContent = `${(
        Number(cort[1].style.height.replace('px', '')) / 80
      ).toFixed(1)} $ for ${Number(storageValue) + Number(transferValue)} GB`;
    }
  }
  const sum = Number(storageValue) + Number(transferValue);
  if (multi.checked) {
    if (sum <= 150) {
      cort[2].style.width = '0px';
      hint[2].classList.remove('visually-hidden');
      hint[2].textContent = `0$ for ${sum} GB`;
    } else {
      cort[2].style.width = `${
        ((Number(storageValue) - 75) * 0.06 +
          (Number(transferValue) - 75) * 0.02) *
        80
      }px`;
      hint[2].classList.remove('visually-hidden');
      hint[2].textContent = `${(
        Number(cort[2].style.width.replace('px', '')) / 80
      ).toFixed(1)} $ for ${sum} GB`;
      if (Number(cort[2].style.width.replace('px', '')) > 900) {
        cort[2].style.width = '900px';
      }
    }
  }
  if (single.checked) {
    if (sum <= 150) {
      cort[2].style.width = '0px';
      hint[2].classList.remove('visually-hidden');
      hint[2].textContent = `0$ for ${
        Number(storageValue) + Number(transferValue)
      } GB`;
    } else {
      cort[2].style.width = `${
        ((Number(storageValue) - 75) * 0.03 +
          (Number(transferValue) - 75) * 0.02) *
        80
      }px`;
      hint[2].classList.remove('visually-hidden');
      hint[2].textContent = `${(
        Number(cort[2].style.width.replace('px', '')) / 80
      ).toFixed(1)} $ for ${Number(storageValue) + Number(transferValue)} GB`;
    }
  }

  cort[3].style.width = `${
    (storageValue * 0.01 + transferValue * 0.01 < 5
      ? 5
      : storageValue * 0.01 + transferValue * 0.01) * 80
  }px`;
  hint[3].classList.remove('visually-hidden');
  hint[3].textContent = `${(
    Number(cort[3].style.width.replace('px', '')) / 80
  ).toFixed(1)} $ for ${Number(storageValue) + Number(transferValue)} GB`;

  cort.map(el => {
    if (el.style.width.replace('px', '') > 1000) {
      el.style.width = '1000px';
    }
    if (el.style.width.replace('px', '') < 300) {
      el.style.width = '300px';
    }
  });

  cort.map(el => (el.style.backgroundColor = '#54545430'));
  cort.find(
    el =>
      el.style.width ===
      `${Math.min(
        ...cort.map(el => Number(el.style.width.replace('px', '')))
      )}px`
  ).style.backgroundColor = 'rgb(207 30 90 / 66%)';
}
