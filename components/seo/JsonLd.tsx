/**
 * Renders JSON-LD. Server component by design — the markup has to be in the
 * initial HTML for crawlers that never run JS.
 *
 * `JSON.stringify` output is escaped so a `</script>` inside any string value
 * can't break out of the tag.
 */
export default function JsonLd({ schema }: { schema: object | object[] }) {
  const payload = Array.isArray(schema) ? schema : [schema];

  return (
    <>
      {payload.map((entry, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(entry).replace(/</g, '\\u003c'),
          }}
        />
      ))}
    </>
  );
}
