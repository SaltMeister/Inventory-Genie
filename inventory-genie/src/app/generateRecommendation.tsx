'use server'
import openai from "../../utils/openAI"

export async function GenerateRecommendation(items:Array<Object>) {
  let itemString = ""

  items.forEach(item => { 
    itemString += ` ${item.itemCount} ${item.itemName},`
  })

  const completion = await openai.chat.completions.create({
    messages: [{ role: "system", content: `You are a making recommendations for recipes given a list of pantry items. Generate a list of possible recipes that can be made with ${itemString}.` }],
    model: "gpt-4o-mini",
  });

  console.log(completion.choices[0]);
  return completion.choices[0];
}