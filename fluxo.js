
{
  "nodes": [
    {
      "parameters": {
        "path": "rastreio",
        "methods": ["POST"]
      },
      "name": "Receber Requisição HTTP",
      "type": "n8n-nodes-base.webhook",
      "typeVersion": 1,
      "position": [200, 300]
    },
    {
      "parameters": {
        "url": "https://api.linketrack.com/track/json?user=48244369000176&token=gR9dMTzcKYJeVkEfSSf0w36LXGhpeoUyBk7ZO0YT&codigo={{$json["codigo"]}}
",
        "method": "GET",
        "responseFormat": "json"
      },
      "name": "Consultar API dos Correios",
      "type": "n8n-nodes-base.httpRequest",
      "typeVersion": 1,
      "position": [400, 300]
    },
    {
      "parameters": {
        "resource": "message",
        "from": "+14155238886",
        "to": "+55XXXXXXXXXXX",
        "message": "Olá, seu pedido está com status: {{$json[\"evento\"][0][\"status\"]}} em {{$json[\"evento\"][0][\"data\"]}}"
      },
      "name": "Enviar WhatsApp via Twilio",
      "type": "n8n-nodes-base.twilio",
      "typeVersion": 1,
      "position": [600, 300]
    }
  ],
  "connections": {
    "Receber Requisição HTTP": {
      "main": [
        [
          {
            "node": "Consultar API dos Correios",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Consultar API dos Correios": {
      "main": [
        [
          {
            "node": "Enviar WhatsApp via Twilio",
            "type": "main",
            "index": 0
          }
        ]
      ]
    }
  }
}
