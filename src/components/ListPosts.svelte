<script lang="ts">
  // Define the Post interface
  interface Post {
    id: string;
    slug: string;
    body: string;
    data: Record<string, any>;
    collection: string;
    render: any;
  }

  // Define props
  export let list: Post[] = [];

  // Utility functions
  function getDate(date: string) {
    return new Date(date).toISOString();
  }

  function getHref(post: Post) {
    if (post.data.redirect) return post.data.redirect;
    return `/posts/${post.slug}`;
  }

  function getTarget(post: Post) {
    if (post.data.redirect) return "_blank";
    return "_self";
  }

  function isSameYear(a: Date | string | number, b: Date | string | number) {
    return a && b && getYear(a) === getYear(b);
  }

  function getYear(date: Date | string | number) {
    return new Date(date).getFullYear();
  }
</script>

<ul class="sm:min-h-36 min-h-28 mb-16">
  {#if !list || list.length === 0}
    <div class="py-5 opacity-50 text-lg">nothing here yet...</div>
  {/if}

  {#each list as post, index (post.id)}
    <li class="mb-8">
      <!-- Display year if the post's year differs from the previous one -->
      {#if !isSameYear(post.data.date, list[index - 1]?.data.date)}
        <div class="select-none relative h-16 pointer-events-none">
          <span class="text-8xl opacity-20 font-bold absolute top-2">
            {getYear(post.data.date)}
          </span>
        </div>
      {/if}

      <a
        class="text-xl leading-tight flex flex-col gap-2 hover:text-primary transition-colors duration-200 cursor-pointer"
        aria-label={post.data.title}
        target={getTarget(post)}
        href={getHref(post)}
      >
        <div class="flex flex-col md:flex-row gap-2 md:items-center">
          <div class="flex items-center text-wrap">
            <span
              class="leading-normal flex gap-x-2 items-center justify-center"
            >
              {#if post.data.draft}
                <span class="iconify akar-icons--pencil size-6 text-warning"
                ></span>
              {/if}

              {#if post.slug.includes("talks")}
                <span class="iconify akar-icons--microphone size-6 text-info"
                ></span>
              {:else if post.slug.includes("posts")}
                <span
                  class="iconify akar-icons--paper-airplane size-6 text-info"
                ></span>
              {:else}
                <span class="iconify akar-icons--question size-6 text-error"
                ></span>
              {/if}

              {post.data.title}
            </span>
          </div>
          <div class="whitespace-nowrap flex gap-2 items-center">
            {#if post.data.redirect}
              <span class="iconify text-base akar-icons--link-out"></span>
            {/if}
            {#if post.data.recording || post.data.video}
              <span class="iconify text-base akar-icons--video"></span>
            {/if}
            {#if post.data.date}
              <time datetime={getDate(post.data.date)}
                >{post.data.date.split(",")[0]}</time
              >
            {/if}
            {#if post.data.duration}
              <span>· {post.data.duration}</span>
            {/if}
            {#if post.data.tag}
              <span>· {post.data.tag}</span>
            {/if}
          </div>
        </div>
        <div class="opacity-80 text-sm">{post.data.description}</div>
      </a>
    </li>
  {/each}
</ul>
