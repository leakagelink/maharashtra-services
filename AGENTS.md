<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Keep shared logo asset references and social-share metadata in `src/lib/brand.ts`; every content route includes the shared metadata to keep branding consistent without global image-tag inheritance.
- Keep mobile safe-area insets in shared shell CSS and use shrinkable grid tracks for category tiles and mixed text/control rows, so the Android web view and narrow phones remain usable without horizontal overflow.
