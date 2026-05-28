# Digital Drop — sito (Vite + React)

Deploy su **GitHub Pages**: [https://digitaldrop26.github.io/digitaldrop/](https://digitaldrop26.github.io/digitaldrop/) (base `/digitaldrop/`).

## Sviluppo (consigliato in Cursor)

Il sito **non** funziona aprendo solo `index.html` dal disco o con un’anteprima statica: serve il dev server di Vite.

1. Terminale nella root del progetto:
   ```bash
   npm install
   npm run dev
   ```
2. Apri l’URL che Vite stampa (**Local / Network**) nel browser di sistema o nella **Simple Browser** (**Command Palette** → “Simple Browser”). Di solito `http://localhost:5173/` o `http://127.0.0.1:5173/`.

Senza `npm run dev` vedrai il blocco “Caricamento…” / messaggi di fallback: è normale.

### Pagina che non si carica (spin infinito / timeout) con `npm run dev`

Se il progetto sta in una cartella **Dropbox / iCloud / OneDrive**, il dev server può **attaccarsi alla porta ma non rispondere mai** (TCP connesso, pagina vuota / timeout): la sync blocca molte letture. In `vite.config.ts`: **polling**, **`host: true`** e **`cacheDir` sulla cartella temp di sistema** (cache Vite fuori da Dropbox).

Se anche così si blocca:

1. `Ctrl+C` nel terminale del dev server, poi `npm run dev` di nuovo.
2. Prova **`http://localhost:5173/`**, **`http://127.0.0.1:5173/`** e il link **Network** mostrato da Vite.
3. Chiudi connessioni “fantasma” sulla porta: `lsof -ti :5173 | xargs kill -9`, poi `npm run dev`.
4. Rigenerazione cache dipendenze: `npx vite --force`.
5. Dove possibile, **clona/lavora in una cartella locale non sincronizzata** (es. `~/Dev/digitaldrop`).

## Anteprima come in produzione (dopo `vite build`)

Locale è allineata a GitHub Pages quando usi `vite preview` (stessa base `/digitaldrop/`):

```bash
npm run build
npm run preview
```

Poi apri **http://localhost:4173/digitaldrop/** (il suffisso `/digitaldrop/` è necessario perché coincide con il path pubblicato).

## Script di progetto

| Script        | Effetto                                              |
|---------------|------------------------------------------------------|
| `npm run dev` | Server di sviluppo (`base`: `/`).                    |
| `npm run build` | Typecheck + build in `dist/` (`base`: `/digitaldrop/`). |
| `npm run preview` | Serve `dist/`; usa `base` `/digitaldrop/` (come Pages). |

## Estrazione asset dal bundle Claude (opzionale)

Output intermedio ignorato da git (`extracted-bundle/`):

- `node scripts/extract-standalone-bundler.mjs` — da `Downloads`/`Drop Homepage Standalone*.html`
- `node scripts/port-drop-modules.mjs` — aiuta rigenerare i moduli estratti se serve
