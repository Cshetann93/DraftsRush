<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="2.0" 
                xmlns:html="http://www.w3.org/TR/REC-html40"
                xmlns:sitemap="http://www.sitemaps.org/schemas/sitemap/0.9"
                xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes"/>
  <xsl:template match="/">
    <html xmlns="http://www.w3.org/1999/xhtml" lang="en">
      <head>
        <title>XML Sitemap | DraftsRush</title>
        <meta charset="UTF-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <style>
          body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;
            background-color: #E2E4E9;
            color: #111317;
            margin: 0;
            padding: 24px;
          }
          .container {
            max-width: 1024px;
            margin: 0 auto;
          }
          .header-box {
            background-color: #F8D000;
            border: 4px solid #000000;
            box-shadow: 6px 6px 0px #000000;
            padding: 24px;
            margin-bottom: 24px;
          }
          .badge {
            background-color: #000000;
            color: #FFFFFF;
            padding: 4px 8px;
            font-size: 11px;
            font-weight: 800;
            text-transform: uppercase;
            letter-spacing: 1px;
            display: inline-block;
          }
          h1 {
            font-size: 28px;
            font-weight: 900;
            margin: 12px 0 6px 0;
          }
          p {
            font-size: 13px;
            font-weight: 500;
            margin: 0;
            color: #222222;
          }
          .table-box {
            background-color: #FFFFFF;
            border: 4px solid #000000;
            box-shadow: 6px 6px 0px #000000;
            overflow-x: auto;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            font-size: 13px;
          }
          th {
            background-color: #000000;
            color: #FFFFFF;
            text-align: left;
            padding: 12px 16px;
            font-size: 12px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
          }
          tr {
            border-bottom: 1px solid #E2E4E9;
          }
          tr:hover {
            background-color: #FFF6CF;
          }
          td {
            padding: 12px 16px;
          }
          a {
            color: #0F172A;
            text-decoration: none;
            font-weight: 600;
          }
          a:hover {
            text-decoration: underline;
            color: #000000;
          }
          .priority-pill {
            background-color: #E2E4E9;
            border: 1px solid #000000;
            padding: 2px 6px;
            font-size: 11px;
            font-weight: 700;
            font-family: monospace;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header-box">
            <span class="badge">Machine Search Index</span>
            <h1>DraftsRush XML Sitemap</h1>
            <p>
              This is a stylized XML index readable by both search engines and humans. 
              Total indexed URLs in this feed: <strong><xsl:value-of select="count(sitemap:urlset/sitemap:url)"/></strong>
            </p>
          </div>

          <div class="table-box">
            <table>
              <thead>
                <tr>
                  <th style="width: 55%;">URL Location</th>
                  <th style="width: 25%;">Last Modified</th>
                  <th style="width: 20%;">Priority</th>
                </tr>
              </thead>
              <tbody>
                <xsl:for-each select="sitemap:urlset/sitemap:url">
                  <tr>
                    <td>
                      <xsl:variable name="itemURL">
                        <xsl:value-of select="sitemap:loc"/>
                      </xsl:variable>
                      <a href="{$itemURL}">
                        <xsl:value-of select="sitemap:loc"/>
                      </a>
                    </td>
                    <td>
                      <xsl:value-of select="substring(sitemap:lastmod, 0, 11)"/>
                    </td>
                    <td>
                      <span class="priority-pill">
                        <xsl:value-of select="sitemap:priority"/>
                      </span>
                    </td>
                  </tr>
                </xsl:for-each>
              </tbody>
            </table>
          </div>
        </div>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
