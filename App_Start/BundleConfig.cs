using System.Web;
using System.Web.Optimization;

namespace Herent.Web
{
    public class BundleConfig
    {
        // For more information on bundling, visit http://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {

            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                        "~/Scripts/jquery-{version}.js"));

            bundles.Add(new ScriptBundle("~/bundles/jqueryui").Include(
                        "~/Scripts/jquery-ui-{version}.js"));

            bundles.Add(new ScriptBundle("~/bundles/jqueryval").Include(
                        "~/Scripts/jquery.unobtrusive*",
                        "~/Scripts/jquery.validate*"));

            // Use the development version of Modernizr to develop with and learn from. Then, when you're
            // ready for production, use the build tool at http://modernizr.com to pick only the tests you need.
            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                        "~/Scripts/modernizr-*"));

            bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include(
                        "~/Scripts/bootstrap.min.js",
                        "~/Scripts/bootstrap-datepicker.min.js"));

            bundles.Add(new ScriptBundle("~/bundles/dashboard").Include(
                        "~/Scripts/jquery.gridster.min.js",
                        "~/Scripts/jquery.easypiechart.js",
                        "~/Scripts/metisMenu.min.js",
                        "~/Scripts/dashboard.js"));

            bundles.Add(new ScriptBundle("~/bundles/app").Include(
                        "~/Scripts/spin.js",
                        "~/Scripts/require.js",
                        "~/Scripts/custom.js",
                        "~/Scripts/app/main.js"));

            // CSS and styles
            bundles.Add(new StyleBundle("~/Content/bootstrap").Include(
                        "~/Content/bootstrap.min.css",
                        "~/Content/datepicker.min.css",
                        "~/Content/datepicker3.min.css"));

            bundles.Add(new StyleBundle("~/Content/main").Include(
                        "~/Content/jquery.gridster.min.css",
                        "~/Content/main.css",
                        "~/Content/dashboard.css",
                        "~/Content/metisMenu.min.css",
                        "~/Content/cstm-input.css",
                        "~/Content/views.css",
                        "~/Content/font-awesome/font-awesome.min.css"));


            bundles.Add(new StyleBundle("~/Content/themes/base/css").Include(
                        "~/Content/themes/base/jquery.ui.core.css",
                        "~/Content/themes/base/jquery.ui.resizable.css",
                        "~/Content/themes/base/jquery.ui.selectable.css",
                        "~/Content/themes/base/jquery.ui.accordion.css",
                        "~/Content/themes/base/jquery.ui.autocomplete.css",
                        "~/Content/themes/base/jquery.ui.button.css",
                        "~/Content/themes/base/jquery.ui.dialog.css",
                        "~/Content/themes/base/jquery.ui.slider.css",
                        "~/Content/themes/base/jquery.ui.tabs.css",
                        "~/Content/themes/base/jquery.ui.datepicker.css",
                        "~/Content/themes/base/jquery.ui.progressbar.css",
                        "~/Content/themes/base/jquery.ui.theme.css"));
        }

    }
}
