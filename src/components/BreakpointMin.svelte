<script>
  export let width;

  const style = `width: calc((100% - ${width - 1}px) * ${width});`;
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
