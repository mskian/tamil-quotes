<template>
  <footer class="footer" itemtype="https://schema.org/WPFooter" itemscope>
    <div class="content has-text-centered">
      <p>
        🔮 Crafted by <a href="https://www.facebook.com/sandyarmy" target="_blank" rel="nofollow noopener">Santhosh Veer</a> 💁 Author of <a href="https://tamilsms.blog" target="_blank" rel="nofollow noopener">tamilsms.blog</a>
      </P>
      <P>
        <a href="https://feedly.com/i/subscription/feed/https://tamilsms.blog/rss/" class="rssicon" title="RSS Feed" target="_blank" rel="nofollow noopener"><i class="fas fa-rss-square" /></a>
        <a href="https://twitter.com/tamilsmsblog" class="twittericon" title="Follow us on Twitter" target="_blank" rel="nofollow noopener"><i class="fab fa-twitter" /></a>
        <a href="https://www.facebook.com/tamilsmsblog" class="fbicon" title="Follow us on Facebook" target="_blank" rel="nofollow noopener"><i class="fab fa-facebook" /></a>
        <a href="https://www.instagram.com/tamilsms/" class="instagram" title="Tamil SMS on Instagram" target="_blank" rel="nofollow noopener"><i class="fab fa-instagram" /></a>
        <a href="https://text.tamilsms.blog" class="emailicon" title="Subscribe" target="_blank" rel="nofollow noopener"><i class="fas fa-envelope" /></a>
      </P>
    </div>
  </footer>
</template>

<script>
export default {
  props: {
    settings: {
      type: Object,
      required: true
    }
  }
}
</script>
