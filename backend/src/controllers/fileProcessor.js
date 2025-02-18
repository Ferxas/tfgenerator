import fs from 'fs-extra';
import path from 'path';
import fetch from 'node-fetch';
import { config } from '../config/env.js';

export const processFileWithAI = async (req, res) => {
    try {
        const userId = req.user.uid;
        const { chatId, filename } = req.params;

        const filePath = path.join("src/uploads/users", userId, chatId, "input", filename);
        if (!fs.existsSync(filePath)) {
            return res.status(500).json({ error: "File not found" })
        }

        const fileContent = fs.readFileSync(filePath, "utf-8");

        const response = await fetch(config.OLLAMA_API, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                model: "deepseek-r1:1.5b",
                messages: [{ role: "user", content: fileContent }]
            }),
        });

        if (!response.ok) {
            return res.status(500).json({ error: "Error processing file with AI" });
        }

        const responseData = await response.text();
        const responseLines = responseData.trim().split("\n");
        let markdownContent = "";

        responseLines.forEach((line) => {
            try {
                const json = JSON.parse(line);
                if (json.message && json.message.content) {
                    markdownContent += json.message.content;
                }
            } catch (error) {
                console.error("Error parsing JSON line:", line);
            }
        })

        const outputDir = path.join("src/uploads/users", userId, chatId, "output");
        fs.ensureDirSync(outputDir);
        const outputFilePath = path.join(outputDir, `${filename}-resolved.md`);
        fs.writeFileSync(outputFilePath, markdownContent);
        res.json({ message: "File processed successfully", outputFile: outputDir });
    } catch (error) {
        res.status(500).json({ error: "Error processing file", error: error.message })
    }
}