const chipColors = {
    "yellow": "dark:bg-yellow-800 bg-yellow-100",
    "green": "dark:bg-green-800 bg-green-100",
    "red": "dark:bg-red-800 bg-red-100",
    "blue": "dark:bg-blue-800 bg-blue-100",
    "purple": "dark:bg-purple-800 bg-purple-100",
    "white": "dark:bg-zinc-400 bg-zinc-200",
    "gray": "dark:bg-zinc-600 bg-zinc-300"
};


const chiptxtColors = {
    "yellow": "text-yellow-400",
    "green": "text-green-400",
    "red": "text-red-400",
    "blue": "text-blue-400",
    "purple": "text-purple-400",
    "white": "",
    "gray": "text-zinc-400"

}


const colorList = [
    { key: 'yellow', color_name: 'Yellow', text_color: 'text-yellow-400', bg_color: 'bg-yellow-800' },
    { key: 'green', color_name: 'Green', text_color: 'text-green-400', bg_color: 'bg-green-800' },
    { key: 'red', color_name: 'Red', text_color: 'text-red-400', bg_color: 'bg-red-800' },
    { key: 'blue', color_name: 'Blue', text_color: 'text-blue-400', bg_color: 'bg-blue-800' },
    { key: 'purple', color_name: 'Purple', text_color: 'text-purple-400', bg_color: 'bg-purple-800' },
    { key: 'white', color_name: 'White', text_color: '', bg_color: 'bg-zinc-500' },
    { key: 'gray', color_name: 'Gray', text_color: 'text-zinc-400', bg_color: 'bg-zinc-600' }
]



const border_colors = {
    "yellow": "border-yellow-200",
    "green": "border-green-200",
    "red": "border-red-200",
    "blue": "border-blue-200",
    "purple": "border-purple-200",
    "white": "border-zinc-200"
};



export { chipColors, chiptxtColors, colorList, border_colors }
