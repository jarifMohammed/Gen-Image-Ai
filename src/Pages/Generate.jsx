import React from "react";
import { Image, Sparkles } from "lucide-react";

const Generate = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const prompt = e.target.prompt.value;
    console.log("prompt", prompt);
    const form = new FormData();
    form.append("prompt", prompt);

fetch('https://clipdrop-api.co/text-to-image/v1', {
    method: 'POST',
    headers: {
      'x-api-key':import.meta.procesS.env.VITE_API_KEY,
    },
    body: form,
  })
  .then(response => response.arrayBuffer())
  .then(buffer => {
    // buffer here is a binary representation of the returned image
    console.log(buffer);
  })
  };
  return (
    <div className="flex flex-col items-center p-8 max-w-md mx-auto">
      <div className="flex items-center gap-2 mb-6">
        <Sparkles size={28} className="text-indigo-500" />
        <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent">
          Generate Image
        </h1>
        <Sparkles size={28} className="text-purple-500" />
      </div>

      <div className="w-full bg-white/10 backdrop-blur-lg rounded-xl p-6 shadow-xl border border-gray-200/20">
        <form onSubmit={handleSubmit} className="space-y-5" action="">
          <fieldset className="space-y-4">
            <label
              htmlFor="prompt"
              className="block text-sm font-medium text-gray-300 ml-1"
            >
              Enter your creative prompt
            </label>

            <div className="relative">
              <input
                type="text"
                id="prompt"
                name="prompt"
                className="w-full px-4 py-3 bg-black/20 border border-gray-600/50 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 placeholder-gray-400 text-white"
                placeholder="Describe the image you want to create..."
              />
              <Image
                size={20}
                className="absolute right-3 top-3.5 text-gray-400"
              />
            </div>

            <div className="text-xs text-gray-400 ml-1">
              Try to be detailed in your description for better results
            </div>

            <button className="w-full mt-6 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-medium py-3 px-4 rounded-lg transition-all duration-200 shadow-lg shadow-indigo-500/30 flex items-center justify-center gap-2">
              <Sparkles size={16} />
              Generate
            </button>
          </fieldset>
        </form>
      </div>

      <div className="mt-4 text-sm text-gray-400">
        Powered by advanced AI image generation
      </div>
    </div>
  );
};

export default Generate;
