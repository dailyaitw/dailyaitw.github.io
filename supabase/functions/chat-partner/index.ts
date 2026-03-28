// Supabase Edge Function: chat-partner
// Handles AI chat for partner recruitment on dailyai.tw/partner
// Uses GitHub Models (GPT-4o-mini) — free via GitHub token
//
// Deploy: supabase functions deploy chat-partner --project-ref kszbdgfbihnawjgmwjlk
// Set secret: supabase secrets set GITHUB_TOKEN=ghp_xxx --project-ref kszbdgfbihnawjgmwjlk

import { serve } from 'https://deno.land/std@0.177.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const GITHUB_TOKEN = Deno.env.get('GITHUB_TOKEN')!
const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!
const SUPABASE_SERVICE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY') || ''

const SYSTEM_PROMPT = `你是 Daily AI Taiwan 的共同創辦人招募助理。

## 背景
Mark（馬克路思科技創辦人）在製造業待了很多年，包括在大陸的經歷。他掌握了 2026 最新 AI 寫程式的方法和心法，正在尋找**共同創辦人**一起合作。

**重要：這不是外包、不是接案、不是「幫你做網站」的服務。這是找合夥人一起創業。**

Mark 的核心理念：
- 你不必出任何資金，不必學任何 IT 或 AI
- 你出領域知識和運營想法，Mark 出技術和開發費用
- 一起創業、一起經營、一起分享成果
- 能成為商業機會最好，不行就當做練習和情懷
- 簡單目的：2026 年要一起創造營收
- 合作模式都可以談（共同創辦人、合夥、分潤等）

Mark 觀察到在 AI 時代，高齡族群和職場媽媽（寶媽）都有新的機會。但這只是其中一個方向，任何領域都歡迎。重點是找到志同道合的人，一起把想法變成事業。

## 對話流程 — 你必須按照這 5 個步驟引導對話

你要像一個友善的顧問，一步一步引導對方。每次只問一個步驟的問題，等對方回答後再進入下一步。不要一次問所有問題。

### 步驟 1：了解領域
- 詢問對方的背景、工作或生活領域
- 範例問題：「你目前在什麼領域工作，或是生活中最熟悉什麼？」
- 聽到回答後，表達興趣，然後進入步驟 2

### 步驟 2：發現痛點
- 詢問他們在這個領域遇到什麼問題或不方便
- 範例問題：「在這個領域裡，你覺得最讓人頭痛、或最不方便的事是什麼？」
- 可以追問一兩個細節，但不要太深入

### 步驟 3：擴展性
- 詢問是否有其他人也有同樣的問題
- 範例問題：「你覺得身邊還有多少人也遇到類似的問題？」
- 這一步是評估構想能否從個人需求擴展為服務更多人

### 步驟 4：商業潛力
- 輕鬆地聊聊這些人是否願意為解決方案付費
- 範例問題：「如果有一個網站能解決這個問題，你覺得大家會願意付費使用嗎？還是用免費+廣告的方式比較適合？」
- 不需要精確數字，只是感受方向

### 步驟 5：總結 + 交給團隊
- 用 3-5 句話總結對話重點：領域、痛點、目標用戶、商業方向
- 告訴對方：「感謝你的分享！Mark 和團隊會一起審閱這段對話，如果構想合適，會主動聯繫你。」
- 提醒：合作不需要出資金，也不需要學 IT/AI

## 嚴格規則 — 你必須遵守
- **按照上面 5 個步驟引導對話**，每次只專注一個步驟
- **只討論概念和構想層面**，絕對不要提供技術架構、程式語言選擇、資料庫設計等技術細節
- **不要給出架構建議**，例如「可以用 React」「建議用 PostgreSQL」「前後端分離」等
- **不要給出技術實作建議**，例如 API 設計、資料庫 schema、部署方案等
- 不要承諾任何具體的時程或費用
- 保持對話輕鬆友善，像朋友聊天
- 鼓勵對方分享想法，即使不成熟也沒關係 — Mark 說過「不行就當做練習和情懷」
- 強調這是**共同創辦**，不是外包或接案服務。我們找的是合夥人，一起經營
- 適時提醒：你不必出任何資金，不必學任何 IT 或 AI
- 如果對方把這當成外包需求（「幫我做一個...」），溫和地引導：「我們找的不是客戶，是合夥人 — 你願意一起經營這個項目嗎？」
- 如果對方跳過步驟或一次說很多，靈活地把內容歸到對應步驟，然後繼續下一步

## 適合的共同創辦人類型
- 職場媽媽（寶媽）— 了解婚後職場挑戰，有相關社群或服務構想
- 特定產業從業者 — 製造業、餐飲、教育、醫療等，了解行業痛點
- 高齡/退休族群 — 有豐富經驗，想在 AI 時代找到新機會
- 自由工作者 — 需要特定工具或平台
- 社群經營者 — 有經營想法但缺技術
- 任何有真實需求的人

## 可以討論的話題
- 網站構想的概念與願景
- 目標使用者是誰、他們的痛點
- 生活或工作中的實際需求
- 從個人需求如何擴展到服務更多人
- 一般性的商業模式方向（訂閱、廣告、媒合等概念）
- AI 時代帶來的新機會（概念層面）

## 不可以討論的話題
- 具體技術架構或程式實作（前端、後端、資料庫等）
- 開發時程估算
- 費用報價或成本分析
- 法律、合約、股權分配等細節
- 競爭對手深度分析
- **任何關於 Toastmasters 政策爭議或不同意見** — 如果提到 Toastmasters 相關政策爭論，禮貌地引導回網站構想
- 政治、宗教、或其他爭議性話題
- 任何與網站構想無關的冗長討論

## 如果使用者問「這是什麼」「怎麼運作」等系統問題，用以下內容回答：

這是 Daily AI Taiwan（dailyai.tw）的共同創辦人招募平台。

運作方式：
1. 你在這裡跟 AI 助理聊聊你的想法（就是現在這個對話）
2. AI 會用幾個簡單問題了解你的領域和構想
3. 對話結束後，你可以把對話記錄寄到自己的 Email
4. Mark 和團隊會一起審閱每一段對話
5. 如果構想合適，團隊會主動聯繫你，提供更詳細的提案
6. 確認合作後，團隊負責所有技術開發，你負責領域運營

整個過程你不需要出任何資金，也不需要學任何技術。
這不是外包服務，是找共同創辦人一起創業。

如果他們問更多技術細節（「用什麼AI」「怎麼開發」），回答：「技術的部分團隊會全權處理，你完全不需要擔心。我們先聊聊你的構想吧！」

## 語言
- 如果使用者用中文，就用中文回覆
- 如果使用者用英文，就用英文回覆
- 回覆簡潔，每次不超過 200 字`

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

serve(async (req) => {
  // CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const body = await req.json()
    const { action, message, chat_id, history, lang, user_token, messages: emailMessages } = body

    // Verify user is authenticated via token passed in body
    if (!user_token) {
      return new Response(JSON.stringify({ error: 'Not authenticated' }), {
        status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      })
    }

    const supabaseUser = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY)
    const { data: { user }, error: authError } = await supabaseUser.auth.getUser(user_token)

    if (authError || !user) {
      return new Response(JSON.stringify({ error: 'Invalid token', details: authError?.message }), {
        status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      })
    }

    // ---- EMAIL ACTION ----
    if (action === 'email') {
      const msgs = emailMessages || []
      if (msgs.length === 0) {
        return new Response(JSON.stringify({ error: 'No messages to email' }), {
          status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        })
      }

      const isEn = lang === 'en'
      const userEmail = user.email || ''
      const subject = isEn
        ? '[Daily AI Taiwan] My Co-Founder Idea Chat'
        : '[Daily AI Taiwan] 我的共同創辦人構想對話記錄'

      // Build HTML email
      let html = `<div style="font-family:sans-serif;max-width:600px;margin:0 auto;">`
      html += `<h2 style="color:#333;">${isEn ? '🤝 Co-Founder Chat Transcript' : '🤝 共同創辦人對話記錄'}</h2>`
      html += `<p style="color:#888;font-size:13px;">${new Date().toLocaleDateString()} — ${userEmail}</p><hr>`

      msgs.forEach((m: any) => {
        const isAI = m.role === 'assistant'
        const label = isAI ? '🤖 AI' : '👤 ' + (isEn ? 'You' : '你')
        const bg = isAI ? '#f7f7f8' : '#fff'
        html += `<div style="padding:12px 16px;background:${bg};border-bottom:1px solid #eee;">`
        html += `<strong style="font-size:13px;color:#666;">${label}</strong>`
        html += `<p style="margin:6px 0 0;line-height:1.6;white-space:pre-wrap;">${m.content.replace(/</g,'&lt;').replace(/>/g,'&gt;')}</p>`
        html += `</div>`
      })

      // Generate AI summary of the conversation
      const chatText = msgs.map((m: any) => `${m.role === 'assistant' ? 'AI' : 'User'}: ${m.content}`).join('\n')
      let summary = ''
      try {
        const summaryRes = await fetch('https://models.inference.ai.azure.com/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + GITHUB_TOKEN
          },
          body: JSON.stringify({
            model: 'gpt-4o-mini',
            max_tokens: 400,
            messages: [
              { role: 'system', content: isEn
                ? 'You are a business analyst. Summarize this co-founder recruitment conversation. Output in this format:\n\n**Domain**: ...\n**Idea**: ...\n**Pain Point**: ...\n**Target Users**: ...\n**Scalability**: ...\n**Business Potential**: (1-5 stars) + one sentence\n**Recommendation**: one sentence for Mark\n\nKeep it concise.'
                : '你是商業分析師。總結這段共同創辦人招募對話。用以下格式輸出：\n\n**領域**：...\n**構想**：...\n**痛點**：...\n**目標用戶**：...\n**擴展性**：...\n**商業潛力**：(1-5 顆星) + 一句話\n**建議**：給團隊的一句話建議\n\n簡潔扼要。'
              },
              { role: 'user', content: chatText }
            ]
          })
        })
        if (summaryRes.ok) {
          const summaryData = await summaryRes.json()
          summary = summaryData.choices[0].message.content
        }
      } catch (e) {
        console.error('Summary generation error:', e)
      }

      // Add summary section
      if (summary) {
        html += `<div style="margin:16px 0;padding:16px 20px;background:#fffbeb;border-left:4px solid #f59e0b;border-radius:0 8px 8px 0;">`
        html += `<h3 style="margin:0 0 8px;font-size:14px;color:#92400e;">${isEn ? '📋 AI Analysis' : '📋 AI 分析摘要'}</h3>`
        html += `<div style="font-size:13px;line-height:1.8;color:#444;white-space:pre-wrap;">${summary.replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/\*\*(.+?)\*\*/g,'<strong>$1</strong>')}</div>`
        html += `</div>`
      }

      html += `<hr><p style="color:#888;font-size:12px;">${isEn
        ? 'Mark and the team will review this conversation together. Reply to ai@dailyai.tw for any questions.'
        : 'Mark 和團隊會一起審閱這段對話。如有任何問題，請回覆 ai@dailyai.tw'}</p>`
      html += `</div>`

      // Send via Resend API
      const emailRes = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + RESEND_API_KEY
        },
        body: JSON.stringify({
          from: 'Daily AI Taiwan <noreply@dailyai.tw>',
          to: [userEmail],
          bcc: ['ai@dailyai.tw'],
          subject: subject,
          html: html
        })
      })

      if (!emailRes.ok) {
        const errBody = await emailRes.text()
        console.error('Resend API error:', errBody)
        return new Response(JSON.stringify({ error: 'Email failed', details: errBody }), {
          status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        })
      }

      return new Response(JSON.stringify({ success: true }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      })
    }

    // ---- CHAT ACTION (default) ----
    if (!message || message.length > 1000) {
      return new Response(JSON.stringify({ error: 'Invalid message' }), {
        status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      })
    }

    // Rate limit: max 20 messages per user per day
    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY)
    const today = new Date().toISOString().split('T')[0]
    const { count } = await supabase
      .from('partner_chats')
      .select('messages', { count: 'exact', head: false })
      .eq('user_id', user.id)
      .gte('updated_at', today + 'T00:00:00Z')

    // Rough check: if they have many chats updated today, limit
    // (More precise counting would check message count inside JSONB)
    if (count && count > 5) {
      return new Response(JSON.stringify({
        error: 'Daily limit reached',
        reply: lang === 'en'
          ? 'You\'ve reached the daily message limit. Please come back tomorrow, or email ai@dailyai.tw directly!'
          : '你今天的對話次數已達上限。請明天再來，或直接寄信到 ai@dailyai.tw！',
        chat_id: chat_id
      }), {
        status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      })
    }

    // Build messages for GPT (OpenAI format)
    const chatMessages: any[] = [
      { role: 'system', content: SYSTEM_PROMPT }
    ]

    // Add conversation history
    const historyMsgs = (history || [])
      .filter((m: any) => m.role === 'user' || m.role === 'assistant')
      .slice(-10)
      .map((m: any) => ({ role: m.role, content: m.content }))

    chatMessages.push(...historyMsgs)

    // Ensure last message is the new user message
    if (chatMessages.length <= 1 || chatMessages[chatMessages.length - 1].content !== message) {
      chatMessages.push({ role: 'user', content: message })
    }

    // Call GitHub Models API (GPT-4o-mini, free tier)
    const aiRes = await fetch('https://models.inference.ai.azure.com/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + GITHUB_TOKEN
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        max_tokens: 500,
        messages: chatMessages
      })
    })

    if (!aiRes.ok) {
      const errBody = await aiRes.text()
      console.error('GitHub Models API error:', errBody)
      throw new Error('AI API failed')
    }

    const aiData = await aiRes.json()
    const reply = aiData.choices[0].message.content

    // Save to database
    const now = new Date().toISOString()
    const userMsg = { role: 'user', content: message, time: now }
    const assistantMsg = { role: 'assistant', content: reply, time: now }

    let chatId = chat_id

    if (chatId) {
      // Append to existing chat
      const { data: existing } = await supabase
        .from('partner_chats')
        .select('messages')
        .eq('id', chatId)
        .eq('user_id', user.id)
        .single()

      if (existing) {
        const msgs = [...(existing.messages || []), userMsg, assistantMsg]
        await supabase
          .from('partner_chats')
          .update({ messages: msgs, updated_at: now })
          .eq('id', chatId)
      }
    } else {
      // Create new chat
      const welcomeMsg = {
        role: 'assistant',
        content: lang === 'en'
          ? 'Hi! I\'m the partner recruitment assistant for Daily AI Taiwan.\n\nMark has AI & development expertise and is looking for partners with real-world ideas. You don\'t need any money or tech skills — just your domain knowledge.\n\nLet me walk you through a few quick questions to understand your idea.\n\nFirst — what\'s your background? What field do you work in, or what area of life are you most familiar with?'
          : '你好！我是 Daily AI Taiwan 的合作夥伴招募助理。\n\nMark 掌握了最新 AI 開發能力，正在找合作夥伴。你不必出任何資金，也不必學任何 IT 或 AI — 只需要帶著你熟悉領域的想法。\n\n我會用幾個簡單的問題來了解你的構想。\n\n首先 — 你目前在什麼領域工作，或是生活中最熟悉什麼？',
        time: now
      }
      const msgs = [welcomeMsg, userMsg, assistantMsg]
      const { data: newChat } = await supabase
        .from('partner_chats')
        .insert({
          user_id: user.id,
          user_email: user.email,
          messages: msgs,
          status: 'new',
          updated_at: now
        })
        .select('id')
        .single()

      chatId = newChat?.id
    }

    return new Response(JSON.stringify({ reply, chat_id: chatId }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    })

  } catch (e) {
    console.error('Edge function error:', e)
    return new Response(JSON.stringify({ error: 'Internal error' }), {
      status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    })
  }
})
