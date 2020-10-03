<script>
  export let width;

  const style = `width: calc((${width + 1}px - 100%) * ${width});`;
</script>

<style>
  .breakpoint {
    max-width: 100%;
  }

  .content {
    margin-top: 1000%;
  }
</style>

<div class="breakpoint" {style}>
  <div class="content">
    <slot />
  </div>
</div>
