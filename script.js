// Получаем элементы canvas 
const fileInput = document.getElementById('fileInput');
const originalCanvas = document.getElementById('originalCanvas');
const redCanvas = document.getElementById('redCanvas');
const greenCanvas = document.getElementById('greenCanvas');
const blueCanvas = document.getElementById('blueCanvas');
const ctxOriginal = originalCanvas.getContext('2d');
const ctxRed = redCanvas.getContext('2d');
const ctxGreen = greenCanvas.getContext('2d');
const ctxBlue = blueCanvas.getContext('2d');
const modifiedImageData = addBipolarNoise(ctxOriginal, originalCanvas);

// Переменные для хранения данных изображения и его копий для каждого канала
let originalImageData;
let redImageData;
let greenImageData;
let blueImageData;

// Получаем элемент выбора размера матрицы
const matrixSizeSelect = document.getElementById('matrixSize');

// Добавляем обработчик события изменения файла в input[type="file"]
fileInput.addEventListener('change', handleFile);

// Функция, которая выполняется при выборе файла
function handleFile() {
    const file = fileInput.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            const image = new Image();
            image.onload = function () {
                // Устанавливаем размеры canvas'ов равными размерам загруженного изображения
                originalCanvas.width = image.width;
                originalCanvas.height = image.height;
                redCanvas.width = image.width;
                redCanvas.height = image.height;
                greenCanvas.width = image.width;
                greenCanvas.height = image.height;
                blueCanvas.width = image.width;
                blueCanvas.height = image.height;

                // Отрисовываем изображение на canvas'е
                ctxOriginal.drawImage(image, 0, 0);

                // Получаем данные изображения
                originalImageData = ctxOriginal.getImageData(0, 0, image.width, image.height);

                // Создаем копии данных для каждого канала (красный, зеленый, синий)
                redImageData = new ImageData(originalImageData.data.slice(), image.width, image.height);
                greenImageData = new ImageData(originalImageData.data.slice(), image.width, image.height);
                blueImageData = new ImageData(originalImageData.data.slice(), image.width, image.height);

                // Отображаем начальное состояние каналов на соответствующих canvas'ах
                ctxRed.putImageData(redImageData, 0, 0);
                ctxGreen.putImageData(greenImageData, 0, 0);
                ctxBlue.putImageData(blueImageData, 0, 0);
            };
            image.src = e.target.result;
        };
        reader.readAsDataURL(file);
    }
}

// Добавляем обработчик события нажатия на кнопку "Выделить каналы"
const channelSelectionButton = document.getElementById('channelSelectionButton');
channelSelectionButton.addEventListener('click', () => {
    if (originalImageData) {
        // Копируем данные оригинального изображения в каждый канал
        redImageData.data.set(originalImageData.data);
        greenImageData.data.set(originalImageData.data);
        blueImageData.data.set(originalImageData.data);

        // Устанавливаем нули в соответствующих каналах
        for (let i = 0; i < originalImageData.data.length; i += 4) {
            greenImageData.data[i] = 0; // Убираем красный канал
            blueImageData.data[i] = 0; // Убираем красный канал
            redImageData.data[i + 1] = 0; // Убираем зеленый канал
            blueImageData.data[i + 1] = 0; // Убираем зеленый канал
            redImageData.data[i + 2] = 0; // Убираем синий канал
            greenImageData.data[i + 2] = 0; // Убираем синий канал
        }

        // Отображаем обновленные данные на канвасах
        ctxRed.putImageData(redImageData, 0, 0);
        ctxGreen.putImageData(greenImageData, 0, 0);
        ctxBlue.putImageData(blueImageData, 0, 0);

        // Добавляем униполярный шум к каждому из каналов
        addUnipolarNoise(ctxRed, redCanvas);
        addUnipolarNoise(ctxGreen, greenCanvas);
        addUnipolarNoise(ctxBlue, blueCanvas);

        // Добавляем униполярный шум к оригинальному изображению
        addUnipolarNoise(ctxOriginal, originalCanvas);
    }
});


// Добавляем обработчик события нажатия на кнопку "Выделить каналы"
const channelSelectionButton2 = document.getElementById('channelSelectionButton2');
channelSelectionButton2.addEventListener('click', () => {
    if (originalImageData) {
        // Копируем данные оригинального изображения в каждый канал
        redImageData.data.set(originalImageData.data);
        greenImageData.data.set(originalImageData.data);
        blueImageData.data.set(originalImageData.data);

        // Устанавливаем нули в соответствующих каналах
        for (let i = 0; i < originalImageData.data.length; i += 4) {
            greenImageData.data[i] = 0; // Убираем красный канал
            blueImageData.data[i] = 0; // Убираем красный канал
            redImageData.data[i + 1] = 0; // Убираем зеленый канал
            blueImageData.data[i + 1] = 0; // Убираем зеленый канал
            redImageData.data[i + 2] = 0; // Убираем синий канал
            greenImageData.data[i + 2] = 0; // Убираем синий канал
        }

        // Отображаем обновленные данные на канвасах
        ctxRed.putImageData(redImageData, 0, 0);
        ctxGreen.putImageData(greenImageData, 0, 0);
        ctxBlue.putImageData(blueImageData, 0, 0);

        // Добавляем униполярный шум к каждому из каналов
        addBipolarNoise(ctxRed, redCanvas);
        addBipolarNoise(ctxGreen, greenCanvas);
        addBipolarNoise(ctxBlue, blueCanvas);

        // Добавляем униполярный шум к оригинальному изображению
        addBipolarNoise(ctxOriginal, originalCanvas);
    }
});




        const addBipolarNoiseButton = document.getElementById('addBipolarNoiseButton');
        addBipolarNoiseButton.addEventListener('click', addBipolarNoiseToAllChannels);

        function addBipolarNoiseToAllChannels() {
            addBipolarNoise(ctxOriginal, originalCanvas);
            addBipolarNoise(ctxRed, redCanvas);
            addBipolarNoise(ctxGreen, greenCanvas);
            addBipolarNoise(ctxBlue, blueCanvas);
        }

        const addUnipolarNoiseButton = document.getElementById('addUnipolarNoiseButton');
        addUnipolarNoiseButton.addEventListener('click', addUnipolarNoiseToAllChannels);

        function addUnipolarNoiseToAllChannels() {
            addUnipolarNoise(ctxOriginal, originalCanvas);
            addUnipolarNoise(ctxRed, redCanvas);
            addUnipolarNoise(ctxGreen, greenCanvas);
            addUnipolarNoise(ctxBlue, blueCanvas);
        }
        const applyMidpointFilterButton = document.getElementById('applyMidpointFilterButton');
        applyMidpointFilterButton.addEventListener('click', applyMidpointFilterToAllChannels);

        function applyMidpointFilterToAllChannels() {
            applyMidpointFilter(ctxOriginal, originalCanvas);
            applyMidpointFilter(ctxRed, redCanvas);
            applyMidpointFilter(ctxGreen, greenCanvas);
            applyMidpointFilter(ctxBlue, blueCanvas);
        }

        const applyGeometricMeanFilterButton = document.getElementById('applyGeometricMeanFilterButton');
        applyGeometricMeanFilterButton.addEventListener('click', applyGeometricMeanFilterToAllChannels);

        function applyGeometricMeanFilterToAllChannels() {
            applyGeometricMeanFilter(ctxOriginal, originalCanvas);
            applyGeometricMeanFilter(ctxRed, redCanvas);
            applyGeometricMeanFilter(ctxGreen, greenCanvas);
            applyGeometricMeanFilter(ctxBlue, blueCanvas);
        }


 // Функция для добавления биполярного шума к изображению
        function addBipolarNoise(context, canvas) {
            const imageData = context.getImageData(0, 0, canvas.width, canvas.height);


        for (let i = 0; i < imageData.data.length; i += 4) {
            if (Math.random() < 0.1) {
                // Генерируем случайное число -255 или 255 и добавляем к каналам цвета
                const noise = Math.random() < 0.5 ? -255 : 255;
                imageData.data[i] = Math.min(255, Math.max(0, imageData.data[i] + noise));
                imageData.data[i + 1] = Math.min(255, Math.max(0, imageData.data[i + 1] + noise));
                imageData.data[i + 2] = Math.min(255, Math.max(0, imageData.data[i + 2] + noise));
            }
        }
	    
        context.putImageData(imageData, 0, 0);
	return imageData;
}



// Функция для добавления униполярного шума к изображению
function addUnipolarNoise(context, canvas) {
            const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
        // Задайте цвет точек 
        const noiseColor = 255;

        for (let i = 0; i < imageData.data.length; i += 4) {
            if (Math.random() < 0.1) {
                // Установите заданный цвет для каналов цвета (R, G и B)
                imageData.data[i] = noiseColor;
                imageData.data[i + 1] = noiseColor;
                imageData.data[i + 2] = noiseColor;
            }
        }

        context.putImageData(imageData, 0, 0);
}





 const resetNoiseButton = document.getElementById('resetNoiseButton');
        resetNoiseButton.addEventListener('click', resetNoise);

       function resetNoise() {
    if (originalImageData) {
        // Сбрасываем шумы и фильтры в originalCanvas
        originalCanvas.width = originalImageData.width;
        originalCanvas.height = originalImageData.height;
        originalCanvas.getContext('2d').putImageData(originalImageData, 0, 0);

        // Создаем копию данных для каждого канала
        const channelData = new Uint8ClampedArray(originalImageData.data.slice());

        // Сбрасываем шумы и фильтры в redCanvas
        redCanvas.width = originalImageData.width;
        redCanvas.height = originalImageData.height;
        ctxRed.clearRect(0, 0, redCanvas.width, redCanvas.height);
        ctxRed.putImageData(new ImageData(channelData, originalImageData.width, originalImageData.height), 0, 0);

        // Сбрасываем шумы и фильтры в greenCanvas
        greenCanvas.width = originalImageData.width;
        greenCanvas.height = originalImageData.height;
        ctxGreen.clearRect(0, 0, greenCanvas.width, greenCanvas.height);
        ctxGreen.putImageData(new ImageData(channelData, originalImageData.width, originalImageData.height), 0, 0);

        // Сбрасываем шумы и фильтры в blueCanvas
        blueCanvas.width = originalImageData.width;
        blueCanvas.height = originalImageData.height;
        ctxBlue.clearRect(0, 0, blueCanvas.width, blueCanvas.height);
        ctxBlue.putImageData(new ImageData(channelData, originalImageData.width, originalImageData.height), 0, 0);
    }
}








// Функция для применения фильтра срединной точки к изображению
function applyMidpointFilter(context, canvas) {
	// Проверяем, есть ли оригинальные данные изображения
            if (originalImageData) {
	 // Получаем пиксельные данные изображения на указанном canvas
                const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
	// Создаем новый массив для хранения отфильтрованных данных
        const newData = new Uint8ClampedArray(imageData.data);

        // Получаем выбранный размер матрицы
        const matrixSizeSelect = document.getElementById('matrixSize');
        const MatrixSize = parseInt(matrixSizeSelect.value);
        const halfMatrixSize = Math.floor(MatrixSize / 2);
	// Итерируемся по пикселям изображения
        for (let y = 0; y < originalCanvas.height; y++) {
            for (let x = 0; x < originalCanvas.width; x++) {
                const redValues = [];
                const greenValues = [];
                const blueValues = [];
		 // Итерируемся по окрестности пикселя с учетом размера матрицы
                for (let fy = -halfMatrixSize; fy <= halfMatrixSize; fy++) {
                    for (let fx = -halfMatrixSize; fx <= halfMatrixSize; fx++) {
			// Вычисляем координаты соседнего пикселя
                        const pixelX = Math.min(Math.max(x + fx, 0), originalCanvas.width - 1);
                        const pixelY = Math.min(Math.max(y + fy, 0), originalCanvas.height - 1);
			// Вычисляем индекс в массиве пиксельных данных для соседнего пикселя
                        const index = (pixelY * originalCanvas.width + pixelX) * 4;

			// Собираем значения красного, зеленого и синего каналов соседних пикселей
                        redValues.push(imageData.data[index]);
                        greenValues.push(imageData.data[index + 1]);
                        blueValues.push(imageData.data[index + 2]);
                    }
                }
		 // Вычисляем индекс центрального пикселя
                const centerIndex = (y * originalCanvas.width + x) * 4;

                // Вычисляем среднее значение для каждого канала
                const averageRed = redValues.reduce((acc, val) => acc + val, 0) / (MatrixSize * MatrixSize);
                const averageGreen = greenValues.reduce((acc, val) => acc + val, 0) / (MatrixSize * MatrixSize);
                const averageBlue = blueValues.reduce((acc, val) => acc + val, 0) / (MatrixSize * MatrixSize);

                // Устанавливаем среднее значение в центральный пиксель отфильтрованных данных
                newData[centerIndex] = averageRed;
                newData[centerIndex + 1] = averageGreen;
                newData[centerIndex + 2] = averageBlue;
            }
        }

        context.putImageData(new ImageData(newData, canvas.width, canvas.height), 0, 0);
    }
}







// Функция для применения среднегеометрического сглаживания к изображению
function applyGeometricMeanFilter(context, canvas) {
    // Проверяем, есть ли оригинальные данные изображения
    if (originalImageData) {
        // Получаем пиксельные данные изображения на указанном canvas
        const imageData = context.getImageData(0, 0, canvas.width, canvas.height);

        // Создаем новый массив для хранения отфильтрованных данных
        const newData = new Uint8ClampedArray(imageData.data);

        // Получаем выбранный размер матрицы для фильтра
        const matrixSizeSelect = document.getElementById('matrixSize');
        const matrixSize = parseInt(matrixSizeSelect.value);

        const halfMatrixSize = Math.floor(matrixSize / 2);

        // Итерируемся по пикселям изображения
        for (let y = 0; y < originalCanvas.height; y++) {
            for (let x = 0; x < originalCanvas.width; x++) {
                const redValues = [];
                const greenValues = [];
                const blueValues = [];

                // Итерируемся по окрестности пикселя с учетом размера матрицы
                for (let fy = -halfMatrixSize; fy <= halfMatrixSize; fy++) {
                    for (let fx = -halfMatrixSize; fx <= halfMatrixSize; fx++) {
                        // Вычисляем координаты соседнего пикселя
                        const pixelX = Math.min(Math.max(x + fx, 0), originalCanvas.width - 1);
                        const pixelY = Math.min(Math.max(y + fy, 0), originalCanvas.height - 1);

                        // Вычисляем индекс в массиве пиксельных данных для соседнего пикселя
                        const index = (pixelY * originalCanvas.width + pixelX) * 4;

                        // Собираем значения красного, зеленого и синего каналов соседних пикселей
                        redValues.push(imageData.data[index]);
                        greenValues.push(imageData.data[index + 1]);
                        blueValues.push(imageData.data[index + 2]);
                    }
                }

                // Вычисляем индекс центрального пикселя
                const centerIndex = (y * originalCanvas.width + x) * 4;

                // Вычисляем среднегеометрическое значение для каждого канала (R, G, B)
                const geometricMeanRed = Math.pow(redValues.reduce((acc, val) => acc * val, 1), 1 / (matrixSize * matrixSize));
                const geometricMeanGreen = Math.pow(greenValues.reduce((acc, val) => acc * val, 1), 1 / (matrixSize * matrixSize));
                const geometricMeanBlue = Math.pow(blueValues.reduce((acc, val) => acc * val, 1), 1 / (matrixSize * matrixSize));

                // Устанавливаем среднегеометрические значения в центральный пиксель отфильтрованных данных
                newData[centerIndex] = geometricMeanRed;
                newData[centerIndex + 1] = geometricMeanGreen;
                newData[centerIndex + 2] = geometricMeanBlue;
            }
        }

        // Сохраняем отфильтрованные данные на canvas
        context.putImageData(new ImageData(newData, canvas.width, canvas.height), 0, 0);
    }
}


// Добавляем обработчик события для кнопки "Сохранить изображения"
const saveImagesButton = document.getElementById('saveImagesButton');
saveImagesButton.addEventListener('click', () => {
    // Создаем ссылки для скачивания изображений
    saveCanvasAsImage(originalCanvas, 'original.bmp');
    saveCanvasAsImage(redCanvas, 'red.bmp');
    saveCanvasAsImage(greenCanvas, 'green.bmp');
    saveCanvasAsImage(blueCanvas, 'blue.bmp');
});

// Функция для сохранения канваса как изображения
function saveCanvasAsImage(canvas, filename) {
    const link = document.createElement('a');
    link.href = canvas.toDataURL('image/bmp');
    link.download = filename;
    link.click();
}


