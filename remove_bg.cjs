const Jimp = require('jimp');

async function removeBackground() {
  try {
    const image = await Jimp.read('public/viora_bird.png');
    
    // Get the background color from the top-left pixel
    const bgColor = Jimp.intToRGBA(image.getPixelColor(0, 0));
    console.log("Background color:", bgColor);
    
    const tolerance = 40; // Adjust this tolerance as needed
    
    image.scan(0, 0, image.bitmap.width, image.bitmap.height, function(x, y, idx) {
      const r = this.bitmap.data[idx + 0];
      const g = this.bitmap.data[idx + 1];
      const b = this.bitmap.data[idx + 2];
      
      const diff = Math.sqrt(
        Math.pow(r - bgColor.r, 2) + 
        Math.pow(g - bgColor.g, 2) + 
        Math.pow(b - bgColor.b, 2)
      );
      
      if (diff < tolerance) {
        this.bitmap.data[idx + 3] = 0; // Fully transparent
      } else if (diff < tolerance + 30) {
        // Soft blending for anti-aliasing
        const alpha = Math.floor(255 * ((diff - tolerance) / 30));
        this.bitmap.data[idx + 3] = Math.min(this.bitmap.data[idx + 3], alpha);
      }
    });
    
    await image.writeAsync('public/viora_bird.png');
    console.log('Successfully removed background.');
  } catch (error) {
    console.error('Error processing image:', error);
  }
}

removeBackground();
