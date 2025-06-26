import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {type:String, required:true},
    email: {type:String, required:true, unique:true},
    password: {type:String, required:true},
    image: {type:String, default:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAALIAAACUCAMAAAAAoYNxAAAAM1BMVEX///+8vLz09PS5ubn39/e2trbJycn6+vra2trs7Ozw8PDExMTn5+fAwMDNzc3U1NTg4OCQDWwYAAAFPElEQVR4nO2c65KrKhCFtzTKxQu+/9MeL8nEGJRlaDCnivVvKjXJl84Cmqbx37+ioqKioqKioqKioqJzSWvNJGvl3SQhKSk63VT1m6pGd+I30YUZXV/XVO1FVNetG82vYXeu7ekT94VNfeO6uylfkm6GOuT9w64q9xOhVl3jccMRdt106nbgIRzf91gP90J3TXUJeIGumvtMLdr6Ku+DuhW3AEt9zRJvzKRvGIim/Rp4DbTJTayvm3jHXOmswKL50sVb1U1GR5s+MsSrqM9mjo6HeDZHpuluZAJeoMccxJrBxi/VGQYhL3EOZk5XrErtjZE5xrPqpMxdAuKJOeG8YVMAz7KpiEVcWnGsZJmdGhIRT8xDmrSff7LYMCcZgjIh8cScIn9uUxJXVctPrJMGeQoz+ypoEwd5CjP3TOcSB3kKs+MltheIifq+XdSfFb0+/483zA1eEOoH3RkhJwnT6QHfDlDDSSzQ3IJ6PeOKVQu2hqFrzjUQDDKREx+SwoH24AyzwaJEjVGfyEIog/qKb/uKTRdTiKWPeA009g5cxFgGR9rPuwraf/FldNhWRB+E+BFojbwH1wYFSjprz8B7F+INriRUAuGh9jTGS5wRezEldIgvyISRDfJj8TgDmKHOh95TQDLINDUDwWkNQCwNkA0SB7EFfOGCtliYXfidao7cCLFyhxALYfowMoeZmzBx612nPWEGnMFgZhX+GNIgsgIGYBs/MwvgxwR9IQRQIOvj1+wOQIYG3+IMZFxEI4/hDyHQF5MzgAkzfvwB9uvxKAPfP744AGQzF5DDLmPImf9/yFDmiXs5/F7x+SeCzDpjxCNLBNmiyEC+QkNsyiyh1BMMswTyFWpyIFcNumAj3z8Pcg86w4YnDAZkaMYAnSGRGnWeGWOKDBZl5Bdj2GRjdZ4OCTOQruRa/dAwQ5U5BmTsjKQOu1liPQYMaRH0a85pfoBZouff8clnh31Q1Z8XXySwVV0Vn+IDG6lFdMos4Q4qho0UsF19Mh97Q+IdVAzbVaQo8GCutPRCSzXijYAcFa4rp+2N9TBLc6HFgKX0ghS4niJymwOpGVcKg57urMgsh3/XWqr7QRuh5mM/qZQwVw7+FmQOYtzMD2jq28GN46j10PYXu1mZirVw19abAYg2f8LWYCqJIwcP1dKwPvhjStWANsAzHTxg+WflOis6V31cf5hfEXZ6JePxDuAMqp2dzymlsLrdXOGZL+7oZcsyveLClznYuvxCR5XTD2/Va92QoxuaubehmUbh9OfzFWVDswdj89l5zkztbqWeZjf5oN+90J1/ecYuktNjd3K+Je8g17Dn356xa/x4P3GWDHmhTxIk1h6SwxYS8mYV54E+/P6sLSRHYabhKvHMfDBp8jbqHLRDhc/a/XLeH425Hco7aZCDq7TvUv534yX2tfbRcNkUT/nqqeytfZ/FARq+BZ71wczfQPnRpjqtVFHaLyoJ2lR3zcDUxxEL8T4/J2kG3m0Cr60gn5JvBZJENzW2SShcuD9h3oyOVI3tm4wubug99ReChBdDX5c0Ym0xa2ONZJc0/q7CAHVOiPlRC015FeZvg8JC/DzSTnvhaJ02CGl+gjT3oaW/8qdrnrG3aqA8F/5GJl8sZ5dZ7gkb+Pw3LJvpwu2XKadP2Z6IwMac8xkOPPNyRmAe5uwPQlCx0Hc82COK+aYnkUSMwvuenfKdO+S9T6i5Dn0z8BfQ9wMvwiufd5NutK8k+3B/wBE7qTOHSPVzvE/5sH8vul6pVXdjFBUVFRUVFRUVFRX9vv4DG25NVjmEIFAAAAAASUVORK5CYII="},
    imageId: {type:String, default:null},
    address: {type:Object, default: {line1: '', line2: ''}},
    gender: {type:String,default:"Not Selected"},
    dob: {type:String,default:"Not Selected"},
    phone: {type:String,default:'0000000000'}
    
})


const userModel = mongoose.models.user ||mongoose.model('user', userSchema)

export default userModel